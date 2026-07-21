import React from 'react';
import { REVIEWS } from '../data';
import { Star, Award, Quote, Sparkles } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-400 text-xs font-semibold tracking-wider uppercase">
            <Award className="w-3.5 h-3.5" /> Critical Acclaim
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Praised by Explorers & Critics
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See what world-renowned oceanographers and natural history reviewers are saying about the film.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-8 flex flex-col justify-between space-y-6 hover:border-cyan-500/40 transition-colors relative group"
            >
              <Quote className="w-10 h-10 text-cyan-500/20 absolute top-6 right-6 group-hover:text-cyan-500/30 transition-colors" />

              <div className="space-y-4 relative z-10">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-base leading-relaxed italic font-serif">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <h3 className="font-bold text-white text-base">
                  {review.author}
                </h3>
                <p className="text-xs text-cyan-400 font-medium">
                  {review.role}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {review.publication}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Awards & Laurel Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 pt-8 text-center text-slate-400 opacity-80 hover:opacity-100 transition-opacity">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-mono">Winner</p>
            <p className="text-sm font-black text-slate-200">International Ocean Film Fest 2026</p>
            <p className="text-[11px] text-slate-500">Best Cinematography</p>
          </div>

          <div className="hidden sm:block w-px h-10 bg-slate-800" />

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-mono">Official Selection</p>
            <p className="text-sm font-black text-slate-200">Global Wildlife Film Awards</p>
            <p className="text-[11px] text-slate-500">Documentary Feature</p>
          </div>

          <div className="hidden sm:block w-px h-10 bg-slate-800" />

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-mono">Gold Laurel</p>
            <p className="text-sm font-black text-slate-200">Marine Conservation Society</p>
            <p className="text-[11px] text-slate-500">Excellence in Science Communication</p>
          </div>
        </div>

      </div>
    </section>
  );
};
