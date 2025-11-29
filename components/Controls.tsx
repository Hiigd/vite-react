import React from 'react';
import { ChevronLeft, ChevronRight, Maximize2, RotateCcw } from 'lucide-react';

interface ControlsProps {
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  current: number;
  total: number;
}

export const Controls: React.FC<ControlsProps> = ({ onNext, onPrev, onReset, current, total }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl rounded-full px-6 py-3 flex items-center gap-6 z-50">
      <button 
        onClick={onPrev}
        disabled={current === 0}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-700"
        title="الشريحة السابقة"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="text-sm font-bold text-slate-500 tabular-nums">
        {current + 1} / {total}
      </div>

      <button 
        onClick={onNext}
        disabled={current === total - 1}
        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-slate-700"
        title="الشريحة التالية"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-2"></div>

      <button 
        onClick={onReset}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-slate-700"
        title="البداية"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
};