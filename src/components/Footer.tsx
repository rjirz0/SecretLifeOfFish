import React, { useState } from 'react';
import { Waves, Heart, Mail, CheckCircle2, Globe } from 'lucide-react';
import { DOCUMENTARY_INFO } from '../data';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-900">
          
          {/* Brand & Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20">
                <Waves className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-wider text-slate-100">
                SECRET LIFE OF FISH
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An epic 4-part ocean natural history documentary uncovering the complex intelligence, social dynamics, and survival marvels of aquatic life.
            </p>

            <div className="text-xs text-slate-500 space-y-1 pt-2">
              <p>Executive Producer: Ocean Discovery Studios</p>
              <p>Distributed worldwide across 4K streaming platforms.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Documentary Sections
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  Film Synopsis
                </a>
              </li>
              <li>
                <a href="#episodes" className="hover:text-cyan-400 transition-colors">
                  4-Part Episodes
                </a>
              </li>
              <li>
                <a href="#species" className="hover:text-cyan-400 transition-colors">
                  Species Field Guide
                </a>
              </li>
              <li>
                <a href="#bts" className="hover:text-cyan-400 transition-colors">
                  Underwater Gear & Tech
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-cyan-400 transition-colors">
                  Critical Acclaim
                </a>
              </li>
            </ul>
          </div>

          {/* Updates Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Documentary Updates
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive exclusive behind-the-scenes footage, diving logs, and local screening dates.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Thank you! You are subscribed to Secret Life of Fish news.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Secret Life of Fish Documentary. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted for Ocean Lovers & Nature Enthusiasts</span>
            <Heart className="w-3.5 h-3.5 text-cyan-500 fill-cyan-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
