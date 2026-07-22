// Minimal JavaScript for website interactions

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Trailer Modal Toggle
  const trailerModal = document.getElementById('trailer-modal');
  const openModalBtns = [
    document.getElementById('trailer-nav-btn'),
    document.getElementById('trailer-mobile-btn'),
    document.getElementById('hero-trailer-btn'),
    document.getElementById('poster-play-btn'),
  ];
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');

  const openTrailer = () => {
    if (trailerModal) {
      trailerModal.classList.remove('hidden');
      trailerModal.classList.add('flex');
    }
  };

  const closeTrailer = () => {
    if (trailerModal) {
      trailerModal.classList.add('hidden');
      trailerModal.classList.remove('flex');
    }
  };

  openModalBtns.forEach((btn) => {
    if (btn) btn.addEventListener('click', openTrailer);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeTrailer);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeTrailer);

  // Close modal when clicking dark overlay
  if (trailerModal) {
    trailerModal.addEventListener('click', (e) => {
      if (e.target === trailerModal) {
        closeTrailer();
      }
    });
  }

  // Species Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const speciesCards = document.querySelectorAll('.species-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update button active styling
      filterBtns.forEach((b) => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'shadow-md');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');
      });

      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'shadow-md');

      const filter = btn.getAttribute('data-filter');

      speciesCards.forEach((card) => {
        if (filter === 'all' || card.classList.contains(filter || '')) {
          (card as HTMLElement).style.display = 'block';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    });
  });

  // --- LEAD CAPTURE FORM & MONGODB ATLAS CONNECTOR ---
  const leadForm = document.getElementById('lead-capture-form') as HTMLFormElement | null;
  const leadEmailInput = document.getElementById('lead-email') as HTMLInputElement | null;
  const leadNameInput = document.getElementById('lead-name') as HTMLInputElement | null;
  const leadInterestSelect = document.getElementById('lead-interest') as HTMLSelectElement | null;
  const leadSubmitBtn = document.getElementById('lead-submit-btn') as HTMLButtonElement | null;
  const btnText = document.getElementById('btn-text');
  const leadFeedback = document.getElementById('lead-feedback');
  const mongoStatusText = document.getElementById('mongo-status-text');
  const mongoStatusDot = document.getElementById('mongo-status-dot');
  const subscribersCountBadge = document.getElementById('subscribers-count-badge');

  // MongoDB URI Drawer Elements
  const toggleMongoConfigBtn = document.getElementById('toggle-mongo-config-btn');
  const closeMongoConfigBtn = document.getElementById('close-mongo-config-btn');
  const mongoConfigBox = document.getElementById('mongo-config-box');
  const customMongoUriInput = document.getElementById('custom-mongo-uri-input') as HTMLInputElement | null;
  const saveMongoUriBtn = document.getElementById('save-mongo-uri-btn');
  const mongoConfigFeedback = document.getElementById('mongo-config-feedback');

  if (toggleMongoConfigBtn && mongoConfigBox) {
    toggleMongoConfigBtn.addEventListener('click', () => {
      mongoConfigBox.classList.toggle('hidden');
    });
  }

  if (closeMongoConfigBtn && mongoConfigBox) {
    closeMongoConfigBtn.addEventListener('click', () => {
      mongoConfigBox.classList.add('hidden');
    });
  }

  // Handle Manual MongoDB Connection Test
  if (saveMongoUriBtn && customMongoUriInput) {
    saveMongoUriBtn.addEventListener('click', async () => {
      const mongoUri = customMongoUriInput.value.trim();
      if (!mongoUri) {
        if (mongoConfigFeedback) {
          mongoConfigFeedback.className = 'text-[11px] font-medium text-red-400 block pt-1';
          mongoConfigFeedback.textContent = 'Please enter a valid MongoDB Atlas connection string.';
        }
        return;
      }

      saveMongoUriBtn.textContent = 'Connecting to MongoDB Atlas...';

      try {
        const response = await fetch('/api/mongo/connect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mongoUri, dbName: 'Documentary_Updates' })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          if (mongoConfigFeedback) {
            mongoConfigFeedback.className = 'text-[11px] font-semibold text-emerald-300 block pt-1 p-2 bg-emerald-950/80 rounded-lg border border-emerald-500/50';
            mongoConfigFeedback.textContent = `✓ Connected! Connected to database "Documentary_Updates" in cluster "TestingSiteFish". Submit the form to view records in Atlas Data Explorer!`;
          }
          if (mongoStatusText) {
            mongoStatusText.textContent = `MongoDB Atlas: Connected (Documentary_Updates)`;
            mongoStatusText.className = 'font-bold text-emerald-300';
          }
          if (mongoStatusDot) {
            mongoStatusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50';
          }
          if (subscribersCountBadge && typeof data.totalSubscribers === 'number') {
            subscribersCountBadge.textContent = `${data.totalSubscribers} Subscribers`;
            subscribersCountBadge.className = 'text-emerald-300 font-semibold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/50';
          }
        } else {
          throw new Error(data.error || 'Connection failed.');
        }
      } catch (err: any) {
        if (mongoConfigFeedback) {
          mongoConfigFeedback.className = 'text-[11px] font-medium text-red-300 block pt-1 p-2 bg-red-950/80 rounded-lg border border-red-500/50';
          mongoConfigFeedback.textContent = `⚠️ Connection error: ${err.message || 'Check cluster credentials and IP whitelist.'}`;
        }
      } finally {
        saveMongoUriBtn.textContent = 'Connect & Create "Documentary_Updates" DB';
      }
    });
  }

  // Check initial MongoDB status
  const checkMongoStatus = async () => {
    try {
      const res = await fetch('/api/subscribe/status');
      if (res.ok) {
        const data = await res.json();
        if (data.mongoConnected) {
          if (mongoStatusText) {
            mongoStatusText.textContent = `MongoDB Atlas: Connected (${data.dbName})`;
            mongoStatusText.className = 'font-bold text-emerald-300';
          }
          if (mongoStatusDot) {
            mongoStatusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50';
          }
          if (subscribersCountBadge) {
            subscribersCountBadge.textContent = `${data.totalSubscribers} Subscribers`;
            subscribersCountBadge.className = 'text-emerald-300 font-semibold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/50';
          }
        } else {
          if (mongoStatusText) {
            mongoStatusText.textContent = `MongoDB Atlas: Credentials Required (Target: ${data.dbName})`;
            mongoStatusText.className = 'font-bold text-amber-300';
          }
          if (mongoStatusDot) {
            mongoStatusDot.className = 'w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50';
          }
          if (subscribersCountBadge) {
            subscribersCountBadge.textContent = `Sync Ready`;
          }
        }
      }
    } catch {
      if (mongoStatusText) {
        mongoStatusText.textContent = 'MongoDB Atlas: Action Required (Connect MONGODB_URI)';
        mongoStatusText.className = 'font-bold text-amber-300';
      }
    }
  };

  checkMongoStatus();

  if (leadForm && leadEmailInput) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = leadEmailInput.value.trim();
      const name = leadNameInput?.value.trim() || '';
      const interest = leadInterestSelect?.value || 'General Updates';

      if (!email || !email.includes('@')) {
        if (leadFeedback) {
          leadFeedback.className = 'block rounded-xl p-4 text-xs font-medium bg-red-950/80 border border-red-500/50 text-red-200';
          leadFeedback.textContent = '⚠️ Please enter a valid email address.';
        }
        return;
      }

      // Show submitting state
      if (leadSubmitBtn) leadSubmitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Writing Document to MongoDB Atlas...';

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name, interest })
        });

        if (response.ok) {
          const result = await response.json();
          if (leadFeedback) {
            const isMongo = result.savedToMongo;
            leadFeedback.className = isMongo 
              ? 'block rounded-xl p-4 text-xs font-semibold bg-emerald-950/95 border-2 border-emerald-500 text-emerald-100 shadow-xl shadow-emerald-950/50'
              : 'block rounded-xl p-4 text-xs font-semibold bg-amber-950/95 border-2 border-amber-500 text-amber-100 shadow-xl shadow-amber-950/50';
            
            leadFeedback.innerHTML = `
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="${isMongo ? 'text-emerald-400' : 'text-amber-400'} text-lg">${isMongo ? '✓' : '⚠️'}</span>
                  <strong class="text-sm font-bold text-white uppercase tracking-wider">
                    ${isMongo ? 'Successfully Sent to MongoDB Atlas!' : 'Not Added to MongoDB Atlas Yet (Connection String Needed)'}
                  </strong>
                </div>
                
                <p class="text-slate-200 text-xs leading-relaxed">
                  ${isMongo 
                    ? `Your submission for <strong class="text-white">${email}</strong> was written directly to cluster <strong class="text-cyan-300">TestingSiteFish</strong> in database <strong class="text-cyan-300">Documentary_Updates</strong>, collection <strong class="text-slate-200">subscribers</strong>!`
                    : `Your email (<strong class="text-white">${email}</strong>) was captured locally, but <strong class="text-amber-300">has not landed in MongoDB Atlas</strong> because the server lacks your cluster password.`
                  }
                </p>

                ${!isMongo ? `
                  <div class="p-3 bg-slate-950 border border-amber-500/60 rounded-xl space-y-2 text-xs">
                    <p class="text-amber-200 font-semibold flex items-center gap-1.5">
                      <span>👉 How to see "Documentary_Updates" in your Atlas Data Explorer:</span>
                    </p>
                    <ol class="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                      <li>Paste your Atlas Connection URI into <strong class="text-amber-300">Step 1</strong> above.</li>
                      <li>Click <strong class="text-cyan-300">Connect & Create "Documentary_Updates" DB</strong>.</li>
                      <li>Re-submit this form. The database <strong class="text-cyan-300">Documentary_Updates</strong> will instantly appear in your Atlas Data Explorer!</li>
                    </ol>
                  </div>
                ` : `
                  <div class="p-2.5 bg-slate-950/90 border border-slate-800 rounded-lg space-y-1 font-mono text-[11px] text-slate-300">
                    <div class="flex justify-between">
                      <span class="text-slate-400">Database Name:</span>
                      <strong class="text-cyan-300 font-bold">Documentary_Updates</strong>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-400">Collection:</span>
                      <strong class="text-slate-200 font-semibold">subscribers</strong>
                    </div>
                    <div class="flex justify-between border-t border-slate-800 pt-1 mt-1">
                      <span class="text-slate-400">Data Explorer:</span>
                      <span class="text-emerald-400 font-bold">Refresh 'TestingSiteFish' in Atlas!</span>
                    </div>
                  </div>
                `}
              </div>
            `;
          }

          leadForm.reset();
          if (subscribersCountBadge && typeof result.totalSubscribers === 'number') {
            subscribersCountBadge.textContent = `${result.totalSubscribers} Subscribers`;
          }
        } else {
          throw new Error('Server subscription endpoint returned an error.');
        }
      } catch {
        // Fallback for static GitHub Pages hosting
        const existingLeads = JSON.parse(localStorage.getItem('fish_documentary_leads') || '[]');
        const leadObj = { email, name: name || 'Ocean Explorer', interest, timestamp: new Date().toISOString() };
        existingLeads.push(leadObj);
        localStorage.setItem('fish_documentary_leads', JSON.stringify(existingLeads));

        if (leadFeedback) {
          leadFeedback.className = 'block rounded-xl p-4 text-xs font-semibold bg-cyan-950/90 border border-cyan-500/60 text-cyan-200 shadow-lg';
          leadFeedback.innerHTML = `
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-cyan-400 text-base">✓</span>
                <strong class="text-cyan-300 font-bold text-sm">Thank You for Subscribing!</strong>
              </div>
              <p class="text-slate-200 font-normal leading-relaxed">
                Your email (<span class="font-semibold text-white">${email}</span>) was captured successfully!
              </p>
              <div class="p-2 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-300">
                <span>Target Database: <strong class="text-cyan-300">Documentary_Updates</strong></span>
              </div>
            </div>
          `;
        }

        leadForm.reset();
        if (subscribersCountBadge) {
          subscribersCountBadge.textContent = `${existingLeads.length + 12} Subscribers`;
        }
      } finally {
        if (leadSubmitBtn) leadSubmitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Save Email & Connect to MongoDB';
      }
    });
  }
});
