import React, { useState } from 'react';
import { EPISODES, Episode } from '../data';
import { Play, Clock, MapPin, Tv, CheckCircle2 } from 'lucide-react';

interface EpisodeGuideProps {
  onOpenTrailer: () => void;
}

export const EpisodeGuide: React.FC<EpisodeGuideProps> = ({ onOpenTrailer }) => {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>(EPISODES[0]);

  return (
    <section id="episodes" className="py-24 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/40 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Tv className="w-3.5 h-3.5" /> Episode Guide
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              The 4-Part Chapter Series
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Each episode focuses on a distinct ocean biome, featuring unique survival strategies and breathtaking cinematography.
          </p>
        </div>

        {/* Episode Selector & Details View Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Episode Buttons List */}
          <div className="lg:col-span-5 space-y-3">
            {EPISODES.map((ep) => {
              const isSelected = selectedEpisode.id === ep.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => setSelectedEpisode(ep)}
                  className={`w-full text-left p-5 rounded-2xl transition-all border flex items-center gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-cyan-500/80 shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    0{ep.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-cyan-400 uppercase tracking-wider">{ep.number}</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> {ep.duration}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-100 text-base truncate">
                      {ep.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Episode Preview Card */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Episode Thumbnail Banner */}
            <div className="relative h-64 sm:h-80 w-full group">
              <img
                src={selectedEpisode.thumbnail}
                alt={selectedEpisode.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={onOpenTrailer}
                className="absolute inset-0 flex items-center justify-center group/btn"
                aria-label="Play Episode Preview"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/30 group-hover/btn:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </div>
              </button>

              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cyan-300 border border-slate-700">
                {selectedEpisode.number} Preview
              </div>
            </div>

            {/* Episode Information */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <MapPin className="w-4 h-4" /> {selectedEpisode.location}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-4 h-4 text-slate-500" /> Runtime: {selectedEpisode.duration}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedEpisode.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedEpisode.synopsis}
                </p>
              </div>

              {/* Key Species Tags */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Featured Key Species
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedEpisode.keySpecies.map((species, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-cyan-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      {species}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
