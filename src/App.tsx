import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Synopsis } from './components/Synopsis';
import { EpisodeGuide } from './components/EpisodeGuide';
import { SpeciesSpotlight } from './components/SpeciesSpotlight';
import { BehindTheScenes } from './components/BehindTheScenes';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { TrailerModal } from './components/TrailerModal';

export default function App() {
  const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar onOpenTrailer={() => setIsTrailerOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenTrailer={() => setIsTrailerOpen(true)} />
        <Synopsis />
        <EpisodeGuide onOpenTrailer={() => setIsTrailerOpen(true)} />
        <SpeciesSpotlight />
        <BehindTheScenes />
        <Reviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Trailer Modal Overlay */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
}
