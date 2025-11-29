import React from 'react';

interface SlideLayoutProps {
  children: React.ReactNode;
  themeColor: string;
  className?: string;
  fullImage?: boolean;
}

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-900 from-indigo-900 to-indigo-700',
  slate: 'bg-slate-50 from-slate-50 to-slate-100',
  amber: 'bg-amber-50 from-amber-50 to-amber-100',
  emerald: 'bg-emerald-50 from-emerald-50 to-emerald-100',
  blue: 'bg-blue-50 from-blue-50 to-blue-100',
  red: 'bg-red-50 from-red-50 to-red-100',
  orange: 'bg-orange-50 from-orange-50 to-orange-100',
  zinc: 'bg-zinc-50 from-zinc-50 to-zinc-100',
  teal: 'bg-teal-50 from-teal-50 to-teal-100',
  violet: 'bg-violet-50 from-violet-50 to-violet-100',
};

const textColorMap: Record<string, string> = {
  indigo: 'text-white',
  slate: 'text-slate-900',
  amber: 'text-amber-900',
  emerald: 'text-emerald-900',
  blue: 'text-blue-900',
  red: 'text-red-900',
  orange: 'text-orange-900',
  zinc: 'text-zinc-900',
  teal: 'text-teal-900',
  violet: 'text-violet-900',
};

export const SlideLayout: React.FC<SlideLayoutProps> = ({ children, themeColor, className = "", fullImage = false }) => {
  const bgClass = colorMap[themeColor] || colorMap.slate;
  const textClass = textColorMap[themeColor] || textColorMap.slate;

  return (
    <div className={`w-full h-full flex flex-col p-8 md:p-16 transition-all duration-500 overflow-hidden relative shadow-2xl rounded-xl ${fullImage ? '' : `bg-gradient-to-br ${bgClass}`} ${textClass} ${className}`}>
      {children}
    </div>
  );
};