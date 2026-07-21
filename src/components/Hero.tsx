import React from 'react';
import { Play, Star, Film, Award, Sparkles, Tv, ShieldCheck } from 'lucide-react';
import { DOCUMENTARY_INFO } from '../data';

interface HeroProps {
  onOpenTrailer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrailer }) => {
  return (
    <section className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden bg-slate-950">
      {/* Hero Background Image with Atmospheric Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/fish_doc_hero_1784666091091.jpg"
          alt="Fish Documentary Cinematic Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-fade-in"
        />
        {/* Layered overlays for dramatic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Official Nature Documentary
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 flex items-center gap-1">
                <Tv className="w-3.5 h-3.5 text-sky-400" /> 4K Ultra HD
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 4 Parts
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                SECRET LIFE OF <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-200 bg-clip-text text-transparent">FISH</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-cyan-200/90 font-serif italic">
                "{DOCUMENTARY_INFO.tagline}"
              </p>
            </div>

            {/* Ratings & Metadata bar */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 py-2 border-y border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">{DOCUMENTARY_INFO.imdbRating}</span>
                <span className="text-slate-500">IMDb</span>
              </div>

              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <Award className="w-4 h-4" />
                <span>{DOCUMENTARY_INFO.rottenTomatoes} Audience Rating</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Film className="w-4 h-4 text-cyan-400" />
                <span>Runtime: {DOCUMENTARY_INFO.totalRuntime}</span>
              </div>
            </div>

            {/* Synopsis Excerpt */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {DOCUMENTARY_INFO.synopsis}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenTrailer}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/20 flex items-center gap-3 transform hover:-translate-y-0.5 hover:shadow-cyan-400/40 transition-all cursor-pointer"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Play Official Trailer</span>
              </button>

              <a
                href="#episodes"
                className="px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 font-bold text-base hover:border-cyan-500/50 transition-all flex items-center gap-2"
              >
                <span>Explore Episodes</span>
              </a>
            </div>

            {/* Production credits line */}
            <div className="pt-4 text-xs text-slate-400 flex flex-wrap gap-x-6 gap-y-1">
              <span>Narrated by <strong className="text-slate-200">{DOCUMENTARY_INFO.narrator}</strong></span>
              <span>Directed by <strong className="text-slate-200">{DOCUMENTARY_INFO.director}</strong></span>
              <span>Music by <strong className="text-slate-200">{DOCUMENTARY_INFO.composer}</strong></span>
            </div>

          </div>

          {/* Right Poster Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Outer decorative glowing glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/src/assets/images/fish_doc_poster_1784666103124.jpg"
                  alt="Secret Life of Fish Poster"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-500"
                />

                <div className="p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Official Poster</p>
                    <p className="text-sm font-bold text-slate-100">4-Part Limited Series</p>
                  </div>
                  <button
                    onClick={onOpenTrailer}
                    className="p-2.5 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                    title="Watch Trailer"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
