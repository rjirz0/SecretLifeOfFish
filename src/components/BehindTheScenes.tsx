import React from 'react';
import { Camera, Waves, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';

export const BehindTheScenes: React.FC = () => {
  return (
    <section id="bts" className="py-24 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            <Camera className="w-3.5 h-3.5" /> Cinematography Tech
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Filming the Impossible
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            How our expedition team spent 5 years overcoming immense ocean pressure, pitch black darkness, and extreme currents.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              Custom Low-Light Sensors
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Standard cameras require harsh artificial floodlights that blind abyssal fish. Our custom sensors amplify natural bioluminescence by 10,000x without disturbing marine behavior.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              Silent Closed-Circuit Rebreathers
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Traditional scuba gear releases loud, rising air bubbles that startle skittish fish species. Rebreathers recirculate breathing gas, allowing divers to blend seamlessly into reef communities.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 space-y-4 hover:border-cyan-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              Titanium Deep Submersibles
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              To reach depths down to 6,500 meters where water pressure exceeds 600 atmospheres, our documentary team operated specialized manned research submersibles equipped with robotic macro arms.
            </p>
          </div>

        </div>

        {/* Ocean Conservation Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-800/40 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <Heart className="w-4 h-4 fill-cyan-400" /> Ocean Guardianship
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Preserving the Blue Planet for Future Generations
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Over 30% of global marine species face habitat degradation due to rising ocean temperatures and plastic pollution. <em className="text-cyan-200">Secret Life of Fish</em> works alongside marine biologists to establish marine protected zones worldwide.
            </p>
          </div>

          <a
            href="https://www.oceanconservancy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            Learn About Ocean Conservation
          </a>
        </div>

      </div>
    </section>
  );
};
