import React, { useState, useEffect } from 'react';
import { Waves, Play, Volume2, VolumeX, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenTrailer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTrailer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambientSound, setAmbientSound] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    setAmbientSound(!ambientSound);
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-cyan-900/30 py-3 shadow-xl'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Waves className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              DOCUMENTARY
            </span>
            <span className="text-lg font-black tracking-wider text-slate-100 font-sans">
              SECRET LIFE OF FISH
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors">
            Synopsis
          </a>
          <a href="#episodes" className="hover:text-cyan-400 transition-colors">
            Episodes
          </a>
          <a href="#species" className="hover:text-cyan-400 transition-colors">
            Species Spotlight
          </a>
          <a href="#bts" className="hover:text-cyan-400 transition-colors">
            Behind the Scenes
          </a>
          <a href="#reviews" className="hover:text-cyan-400 transition-colors">
            Acclaim
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleSound}
            title={ambientSound ? "Mute Ocean Ambience" : "Play Ocean Ambience"}
            className="p-2.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all flex items-center gap-2 text-xs"
          >
            {ambientSound ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-mono">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="font-mono">Sound OFF</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenTrailer}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/25 flex items-center gap-2 hover:shadow-cyan-400/40 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Watch Trailer</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-cyan-400"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-6 py-6 mt-2 space-y-4">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 py-1 font-medium"
          >
            Synopsis
          </a>
          <a
            href="#episodes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 py-1 font-medium"
          >
            Episodes
          </a>
          <a
            href="#species"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 py-1 font-medium"
          >
            Species Spotlight
          </a>
          <a
            href="#bts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 py-1 font-medium"
          >
            Behind the Scenes
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-400 py-1 font-medium"
          >
            Acclaim
          </a>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrailer();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
