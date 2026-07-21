import React, { useState } from 'react';
import { SPECIES_LIST, Species } from '../data';
import { Waves, Info, ShieldAlert, Sparkles, X, ChevronRight } from 'lucide-react';

export const SpeciesSpotlight: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeSpecies, setActiveSpecies] = useState<Species | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Species' },
    { id: 'Reef Symbiont', label: 'Reef Inhabitants' },
    { id: 'Ocean Giant', label: 'Giants & Pelagic' },
    { id: 'Bioluminescent', label: 'Deep Abyssal' },
  ];

  const filteredSpecies = activeTab === 'all'
    ? SPECIES_LIST
    : SPECIES_LIST.filter(s => s.badge.toLowerCase().includes(activeTab.toLowerCase()) || activeTab.includes(s.badge));

  return (
    <section id="species" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/40 text-teal-400 text-xs font-semibold tracking-wider uppercase">
            <Waves className="w-3.5 h-3.5" /> Marine Biology
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Species Spotlight
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Meet the remarkable fish stars featured in our 4K underwater documentary.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecies.map((species) => (
            <div
              key={species.id}
              onClick={() => setActiveSpecies(species)}
              className="group bg-slate-900/80 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={species.image}
                    alt={species.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-cyan-300 border border-slate-700">
                    {species.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {species.name}
                    </h3>
                    <p className="text-xs text-slate-400 italic font-serif">
                      {species.scientificName}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {species.funFact}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>Depth: <strong className="text-slate-200">{species.depth}</strong></span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Facts <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Species Modal Popup */}
        {activeSpecies && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
              <button
                onClick={() => setActiveSpecies(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-72 w-full">
                <img
                  src={activeSpecies.image}
                  alt={activeSpecies.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold uppercase tracking-wider">
                    {activeSpecies.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    {activeSpecies.name}
                  </h3>
                  <p className="text-sm text-cyan-200 italic font-serif">
                    {activeSpecies.scientificName}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block uppercase">Habitat</span>
                    <strong className="text-slate-200 text-sm">{activeSpecies.habitat}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase">Depth Range</span>
                    <strong className="text-slate-200 text-sm">{activeSpecies.depth}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase">Average Size</span>
                    <strong className="text-slate-200 text-sm">{activeSpecies.size}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" /> Documentary Fact Spotlight
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed bg-cyan-950/30 border border-cyan-900/50 p-4 rounded-xl">
                    "{activeSpecies.funFact}"
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveSpecies(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
