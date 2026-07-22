import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to resolve and clean MongoDB URI from any common environment variable name or user input
function cleanMongoUri(uri) {
  if (!uri || typeof uri !== 'string') return null;
  let cleaned = uri.trim();
  if (cleaned.includes('<username>') || cleaned.includes('<password>')) {
    return null;
  }
  
  // Replace spaces in URI
  cleaned = cleaned.replace(/\s+/g, '%20');

  // Prevent connecting directly to system/internal databases ('local', 'admin', 'config')
  // as Atlas user accounts are unauthorized to create user collections in local/admin/config.
  cleaned = cleaned.replace(/\/(local|admin|config)(\?|$)/i, '/Documentary_Updates$2');
  cleaned = cleaned.replace(/\/Documentary(%20|\s|_)+Updates(\?|$)/gi, '/Documentary_Updates$2');

  return cleaned;
}

function getMongoUriFromEnv() {
  const rawUri = (
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    process.env.MONGODB_URl ||
    process.env.MONGO_URI ||
    process.env.MONGO_URL ||
    null
  );
  return cleanMongoUri(rawUri);
}

// Helper function to sanitize MongoDB database name (MongoDB prohibits spaces and system db names)
function sanitizeDbName(name) {
  if (!name || typeof name !== 'string') return 'Documentary_Updates';
  let cleaned = name.trim().replace(/\s+/g, '_').replace(/[\/\\\.\"\$\*\<\>\:\|\?]/g, '');
  if (!cleaned || ['local', 'admin', 'config'].includes(cleaned.toLowerCase())) {
    return 'Documentary_Updates';
  }
  return cleaned;
}

// Helper function to sanitize collection name
function sanitizeCollectionName(name) {
  if (!name || typeof name !== 'string') return 'subscribers';
  let cleaned = name.trim().replace(/\s+/g, '_').replace(/[\/\\\.\"\$\*\<\>\:\|\?]/g, '');
  return cleaned || 'subscribers';
}

// Lazy MongoDB Atlas Client setup
let dbClient = null;
let dbInstance = null;
let activeMongoUri = getMongoUriFromEnv();

async function getMongoDb(customUri) {
  let uriToUse = customUri ? cleanMongoUri(customUri) : (activeMongoUri || getMongoUriFromEnv());
  if (!uriToUse) {
    return null;
  }
  
  // If already connected with same URI, reuse instance
  if (dbInstance && dbClient) {
    return dbInstance;
  }

  try {
    dbClient = new MongoClient(uriToUse);
    await dbClient.connect();
    activeMongoUri = uriToUse;
    const rawDbName = process.env.MONGODB_DB_NAME || 'Documentary_Updates';
    const dbName = sanitizeDbName(rawDbName);
    dbInstance = dbClient.db(dbName);
    console.log(`Successfully connected to MongoDB Atlas! Target Database: "${dbName}"`);
    return dbInstance;
  } catch (err) {
    console.error('MongoDB Atlas Connection Error:', err);
    return null;
  }
}

// In-memory fallback subscribers list
const fallbackSubscribers = [
  { email: 'marine.explorer@ocean.org', name: 'Dr. Sylvia', interest: 'Deep-Sea Marine Life', createdAt: new Date().toISOString(), source: 'initial' },
  { email: 'reef.guardian@nature.com', name: 'Jacques C.', interest: 'Coral Reef Ecosystems', createdAt: new Date().toISOString(), source: 'initial' }
];

// Endpoint: Test & Save Runtime MongoDB Connection URI
app.post('/api/mongo/connect', async (req, res) => {
  try {
    const { mongoUri, dbName } = req.body || {};
    const cleanedUri = cleanMongoUri(mongoUri);
    if (!cleanedUri) {
      return res.status(400).json({ success: false, error: 'Please provide a valid MongoDB connection string.' });
    }

    // Reset previous client if any
    if (dbClient) {
      try { await dbClient.close(); } catch {}
      dbClient = null;
      dbInstance = null;
    }

    const testDbName = sanitizeDbName(dbName || process.env.MONGODB_DB_NAME || 'Documentary_Updates');
    const client = new MongoClient(cleanedUri);
    await client.connect();
    const db = client.db(testDbName);
    
    // Ping database
    await db.command({ ping: 1 });
    
    // Set active client
    dbClient = client;
    dbInstance = db;
    activeMongoUri = cleanedUri;

    const collectionName = sanitizeCollectionName(process.env.MONGODB_COLLECTION || 'subscribers');
    const count = await db.collection(collectionName).countDocuments();

    return res.json({
      success: true,
      message: `Successfully connected to MongoDB Atlas! Database: "${testDbName}"`,
      dbName: testDbName,
      collectionName,
      totalSubscribers: count
    });
  } catch (error) {
    console.error('Manual MongoDB Connection Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Could not connect to MongoDB Atlas with the provided connection string.'
    });
  }
});

// API Endpoint: Lead Capture Form Submission
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, name, interest } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const cleanName = typeof name === 'string' && name.trim() ? name.trim() : 'Ocean Enthusiast';
    const cleanInterest = typeof interest === 'string' && interest.trim() ? interest.trim() : 'General Conservation';
    const targetDbName = sanitizeDbName(process.env.MONGODB_DB_NAME || 'Documentary_Updates');
    const targetCollection = sanitizeCollectionName(process.env.MONGODB_COLLECTION || 'subscribers');

    const newLead = {
      email: trimmedEmail,
      name: cleanName,
      interest: cleanInterest,
      createdAt: new Date().toISOString(),
      source: 'fish_website_lead_form',
      status: 'subscribed',
      userAgent: req.headers['user-agent'] || 'browser'
    };

    const db = await getMongoDb();

    if (db) {
      const collection = db.collection(targetCollection);
      
      // Upsert lead in MongoDB Atlas by email
      await collection.updateOne(
        { email: trimmedEmail },
        { $set: newLead, $setOnInsert: { firstSubscribedAt: new Date().toISOString() } },
        { upsert: true }
      );

      const totalCount = await collection.countDocuments();

      return res.json({
        success: true,
        savedToMongo: true,
        message: `✓ Submission saved to MongoDB Atlas! Data stored in database "${targetDbName}", collection "${targetCollection}".`,
        dbName: targetDbName,
        collectionName: targetCollection,
        totalSubscribers: totalCount,
        data: { email: trimmedEmail, name: cleanName, interest: cleanInterest }
      });
    } else {
      // Local fallback
      const existingIdx = fallbackSubscribers.findIndex(s => s.email === trimmedEmail);
      if (existingIdx >= 0) {
        fallbackSubscribers[existingIdx] = newLead;
      } else {
        fallbackSubscribers.push(newLead);
      }

      return res.json({
        success: true,
        savedToMongo: false,
        message: `Lead captured! (Local mode). Target database will be "${targetDbName}". Connect MONGODB_URI to stream live into MongoDB Atlas!`,
        dbName: targetDbName,
        collectionName: targetCollection,
        totalSubscribers: fallbackSubscribers.length,
        data: { email: trimmedEmail, name: cleanName, interest: cleanInterest }
      });
    }
  } catch (error) {
    console.error('Error handling subscription:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your request.'
    });
  }
});

// API Endpoint: Check Subscriber Count & MongoDB Status
app.get('/api/subscribe/status', async (req, res) => {
  try {
    const targetDbName = sanitizeDbName(process.env.MONGODB_DB_NAME || 'Documentary_Updates');
    const collectionName = process.env.MONGODB_COLLECTION || 'subscribers';
    const db = await getMongoDb();
    
    if (db) {
      const count = await db.collection(collectionName).countDocuments();
      return res.json({
        mongoConnected: true,
        totalSubscribers: count,
        dbName: targetDbName,
        collectionName: collectionName
      });
    } else {
      return res.json({
        mongoConnected: false,
        totalSubscribers: fallbackSubscribers.length,
        dbName: targetDbName,
        collectionName: collectionName,
        message: `MongoDB Atlas ready. Target database: "${targetDbName}".`
      });
    }
  } catch (err) {
    return res.json({ mongoConnected: false, totalSubscribers: fallbackSubscribers.length, dbName: 'Documentary_Updates' });
  }
});

async function startServer() {
  // Vite middleware in development or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
