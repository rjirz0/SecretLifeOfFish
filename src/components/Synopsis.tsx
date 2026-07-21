import React from 'react';
import { DOCUMENTARY_INFO } from '../data';
import { Compass, Waves, Camera, Globe, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Synopsis: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5" /> Film Overview
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            An Unprecedented Cinematic Underwater Journey
          </h2>
          <p className="text-slate-400 text-lg">
            Five years in production across 28 countries, uncovering secrets of fish behavior never before captured on film.
          </p>
        </div>

        {/* Stats Bar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {DOCUMENTARY_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 text-center hover:border-cyan-500/40 transition-colors group"
            >
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 group-hover:scale-105 transition-transform mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-12">
          
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Rethinking How We View Aquatic Life
            </h3>

            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              Fish are often perceived as simple creatures operating purely on instinct. <em className="text-cyan-300 font-serif">Secret Life of Fish</em> dismantles this myth, revealing complex social communication, tool usage, emotional bonds, and astonishing navigational precision across vast ocean basins.
            </p>

            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Utilizing custom ultra-low-light macro lenses, deep-sea submersibles, and rebreather diving technology that leaves zero bubble noise to disturb marine habitats, our film crew captures candid intimate moments from coral reef nurseries to pitch-black abyssal trenches.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <Camera className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">8K High-Speed Cameras</h4>
                  <p className="text-xs text-slate-400">Capturing strikes occurring in less than 3 milliseconds.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <Globe className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">Global Expedition</h4>
                  <p className="text-xs text-slate-400">From the Arctic ice sheets to equatorial archipelagos.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-6 bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-800">
            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
              <ShieldCheck className="w-5 h-5 text-cyan-400" /> Production Details
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Narrator:</span>
                <span className="font-semibold text-slate-200">{DOCUMENTARY_INFO.narrator}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Director:</span>
                <span className="font-semibold text-slate-200">{DOCUMENTARY_INFO.director}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Original Score:</span>
                <span className="font-semibold text-slate-200">{DOCUMENTARY_INFO.composer}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Release Year:</span>
                <span className="font-semibold text-slate-200">{DOCUMENTARY_INFO.releaseYear}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Audio Format:</span>
                <span className="font-semibold text-slate-200">Dolby Atmos Surround</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center gap-3">
                <Heart className="w-5 h-5 text-cyan-400 shrink-0" />
                <p className="text-xs text-cyan-200 leading-snug">
                  10% of documentary proceeds support global coral restoration & ocean cleanup initiatives.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
