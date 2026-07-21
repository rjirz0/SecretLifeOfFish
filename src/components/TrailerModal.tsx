import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Subtitles, Check, RotateCcw } from 'lucide-react';
import { DOCUMENTARY_INFO } from '../data';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [selectedSubLanguage, setSelectedSubLanguage] = useState('English [CC]');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Official 4K Trailer</p>
              <h3 className="text-base font-bold text-slate-100">{DOCUMENTARY_INFO.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label="Close trailer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display Container */}
        <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
          
          {/* Animated Video Stream Visualizer / Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/fish_doc_hero_1784666091091.jpg"
              alt="Trailer Scene"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? 'scale-105 filter brightness-105' : 'scale-100 filter brightness-75 blur-[2px]'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          </div>

          {/* Subtitles Overlay */}
          {subtitlesEnabled && (
            <div className="absolute bottom-16 left-6 right-6 text-center z-10 pointer-events-none">
              <span className="inline-block px-4 py-1.5 rounded-md bg-slate-950/80 text-cyan-200 text-xs sm:text-sm font-medium border border-slate-800 shadow-md">
                "In the sunlit coral shallows, over two thousand species share a single living reef ecosystem..."
              </span>
            </div>
          )}

          {/* Center Play/Pause Overlay Toggle */}
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="z-20 w-20 h-20 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
            >
              <Play className="w-10 h-10 fill-slate-950 ml-1" />
            </button>
          )}

          {/* Video Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex flex-col gap-2">
            
            {/* Scrub Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative group/scrub">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 w-3/5 group-hover/scrub:bg-cyan-300 transition-all" />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="font-mono text-slate-400">01:24 / 02:45</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                  className={`flex items-center gap-1 font-semibold transition-colors ${
                    subtitlesEnabled ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title="Toggle Subtitles"
                >
                  <Subtitles className="w-4 h-4" />
                  <span className="hidden sm:inline">CC</span>
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-cyan-400 transition-colors"
                  title="Replay"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Bottom Footer Info */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Secret Life of Fish - Official Teaser</h4>
            <p className="text-xs text-slate-400">Available in 4K HDR Dolby Vision on select streaming platforms.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              Done Watching
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
