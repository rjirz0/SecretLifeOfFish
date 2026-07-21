export interface Episode {
  id: number;
  number: string;
  title: string;
  duration: string;
  thumbnail: string;
  synopsis: string;
  keySpecies: string[];
  location: string;
}

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  habitat: string;
  depth: string;
  size: string;
  diet: string;
  funFact: string;
  image: string;
  badge: string;
}

export interface Review {
  id: number;
  author: string;
  role: string;
  rating: number;
  comment: string;
  publication: string;
}

export const DOCUMENTARY_INFO = {
  title: "SECRET LIFE OF FISH",
  tagline: "Unveiling the Mysterious Aquatic Realms of Earth",
  narrator: "Dr. Alistair Finch & Maya Lin",
  director: "Elena Rostova",
  composer: "Marcus Vance",
  episodesCount: 4,
  totalRuntime: "3h 40m",
  releaseYear: "2026",
  imdbRating: "9.4 / 10",
  rottenTomatoes: "98%",
  synopsis: "Five years in the making, 'Secret Life of Fish' takes viewers on an unprecedented journey into Earth's most elusive underwater ecosystems. From sun-drenched coral reefs to dark abyssal trenches 4,000 meters deep, discover how fish communicate, hunt, form symbiotic partnerships, and navigate thousands of miles across open ocean.",
  stats: [
    { label: "Hours Underwater", value: "1,200+" },
    { label: "Species Documented", value: "450+" },
    { label: "Filming Locations", value: "28 Countries" },
    { label: "Max Camera Depth", value: "6,500m" }
  ]
};

export const EPISODES: Episode[] = [
  {
    id: 1,
    number: "Episode 01",
    title: "Sunlit Reefs & Coral Cities",
    duration: "52 min",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    synopsis: "Explore the bustling underwater metropolis of tropical coral reefs. Witness complex social hierarchies, cleaner station diplomacy, and how clownfish defend their sea anemone homes.",
    keySpecies: ["Clownfish", "Mandarin Dragonet", "Parrotfish"],
    location: "Great Barrier Reef & Raja Ampat"
  },
  {
    id: 2,
    number: "Episode 02",
    title: "Masters of Camouflage",
    duration: "55 min",
    thumbnail: "https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80",
    synopsis: "In a world where seeing is surviving, fish have evolved astonishing optical illusions. Meet seahorses mimicking kelp, flounder blending into sandy bottoms, and lionfish displaying warning colors.",
    keySpecies: ["Leafy Seadragon", "Peacock Flounder", "Lionfish"],
    location: "Lembeh Strait, Indonesia"
  },
  {
    id: 3,
    number: "Episode 03",
    title: "The Abyssal Midnight",
    duration: "58 min",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    synopsis: "Descend into perpetual darkness beyond 1,000 meters where sunlight never reaches. Uncover bioluminescent lures, pitch-black predators, and creatures that generate their own living light.",
    keySpecies: ["Deep-Sea Anglerfish", "Vampire Squid", "Gulper Eel"],
    location: "Mariana Trench & Monterey Canyon"
  },
  {
    id: 4,
    number: "Episode 04",
    title: "The Great Ocean Highway",
    duration: "55 min",
    thumbnail: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
    synopsis: "Follow massive schools of pelagic fish across thousands of miles of open ocean. Experience the majestic journey of whale sharks, bluefin tuna, and salmon returning to their natal rivers.",
    keySpecies: ["Whale Shark", "Pacific Salmon", "Yellowfin Tuna"],
    location: "Galapagos Islands & Pacific Northwest"
  }
];

export const SPECIES_LIST: Species[] = [
  {
    id: "clownfish",
    name: "Clown Anemonefish",
    scientificName: "Amphiprion ocellaris",
    habitat: "Shallow Coral Reefs",
    depth: "1 - 15 meters",
    size: "8 - 11 cm",
    diet: "Algae, Zooplankton",
    funFact: "Clownfish possess a specialized mucus layer that protects them from the lethal stinging tentacles of sea anemones.",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80",
    badge: "Reef Symbiont"
  },
  {
    id: "whaleshark",
    name: "Whale Shark",
    scientificName: "Rhincodon typus",
    habitat: "Open Tropical Oceans",
    depth: "Surface to 1,900m",
    size: "up to 12 meters",
    diet: "Plankton, Small Fish",
    funFact: "Despite being the largest fish in the ocean, whale sharks are gentle filter-feeders with teeth no larger than match heads.",
    image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=600&q=80",
    badge: "Ocean Giant"
  },
  {
    id: "anglerfish",
    name: "Deep-Sea Anglerfish",
    scientificName: "Melanocetus johnsonii",
    habitat: "Bathypelagic Abyss",
    depth: "1,000 - 4,000 meters",
    size: "18 cm",
    diet: "Crustaceans & Deep Fish",
    funFact: "Females carry a glowing bioluminescent rod called an esca populated by light-producing bacteria to attract prey in total pitch darkness.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    badge: "Bioluminescent"
  },
  {
    id: "mandarin",
    name: "Mandarin Dragonet",
    scientificName: "Synchiropus splendidus",
    habitat: "Inshore Reef Lagoons",
    depth: "1 - 18 meters",
    size: "6 cm",
    diet: "Small Amphipods",
    funFact: "Unlike most fish, mandarin dragonets lack scales and produce a foul-tasting toxic coating to deter reef predators.",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600&q=80",
    badge: "Vibrant Beauty"
  },
  {
    id: "seadragon",
    name: "Leafy Seadragon",
    scientificName: "Phycodurus eques",
    habitat: "Kelp Beds & Seaweed Reefs",
    depth: "4 - 30 meters",
    size: "20 - 24 cm",
    diet: "Mysid Shrimp",
    funFact: "Their leaf-like appendages are purely for camouflage. They propel themselves using transparent fins that are nearly invisible in swaying kelp.",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80",
    badge: "Camouflage Master"
  },
  {
    id: "lionfish",
    name: "Red Lionfish",
    scientificName: "Pterois volitans",
    habitat: "Coastal Inshore & Offshore Reefs",
    depth: "2 - 50 meters",
    size: "30 - 38 cm",
    diet: "Small Crustaceans & Juvenile Fish",
    funFact: "Lionfish fan out their decorative venomous spines to corner small fish before swallowing them whole in a split second.",
    image: "https://images.unsplash.com/photo-1524704685729-38c2f1f516d2?auto=format&fit=crop&w=600&q=80",
    badge: "Apex Hunter"
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Dr. Sylvia Earle",
    role: "Oceanographer & Explorer",
    rating: 5,
    comment: "An absolute masterpiece. Secret Life of Fish captures the beauty and intelligence of aquatic creatures like nothing before. Every frame is breathtaking.",
    publication: "Marine Science Quarterly"
  },
  {
    id: 2,
    author: "James Cameron",
    role: "Filmmaker & Ocean Pioneer",
    rating: 5,
    comment: "The deep-sea cinematography in Episode 3 sets a new benchmark for underwater filmmaking. Simply hypnotic.",
    publication: "Ocean Tech Journal"
  },
  {
    id: 3,
    author: "David Attenborough Fan Community",
    role: "Documentary Critics",
    rating: 5,
    comment: "Spellbinding sound design paired with 4K underwater imagery. A must-watch for nature lovers and families alike.",
    publication: "Nature Film Review"
  }
];
