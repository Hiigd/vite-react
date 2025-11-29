import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import { SlideType } from './types';
import { SlideLayout } from './components/SlideLayout';
import { Controls } from './components/Controls';
import { SeismographChart } from './components/SeismographChart';
import { Activity, Layers, Radio, Globe, Zap, AlertTriangle, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = SLIDES[currentSlideIndex];

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Content Renderer
  const renderContent = () => {
    switch (slide.type) {
      case SlideType.TITLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="p-6 bg-white/20 rounded-full backdrop-blur-md mb-4">
              <Activity size={80} className="text-white animate-pulse" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight drop-shadow-md">
              {slide.title}
            </h1>
            <h2 className="text-2xl md:text-4xl font-light opacity-90 max-w-3xl">
              {slide.subtitle}
            </h2>
          </div>
        );

      case SlideType.CONTENT_LIST:
        return (
          <div className="flex flex-col h-full justify-center max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10 border-b-2 border-current pb-4 w-fit px-4">
              <Globe size={40} />
              <h2 className="text-4xl md:text-5xl font-bold">{slide.title}</h2>
            </div>
            <ul className="space-y-6">
              {slide.content?.map((item, idx) => (
                <li key={idx} className="text-2xl md:text-3xl leading-relaxed flex items-start gap-4 animate-fadeIn">
                  <span className="mt-2 block w-3 h-3 rounded-full bg-current opacity-70 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case SlideType.QUOTE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto">
             <div className="mb-8 opacity-50"><AlertTriangle size={64} /></div>
             <h2 className="text-4xl font-bold mb-12">{slide.title}</h2>
             <div className="grid gap-8">
               {slide.content?.map((item, idx) => (
                 <div key={idx} className="bg-white/40 p-8 rounded-2xl backdrop-blur-sm shadow-lg border border-white/50">
                   <p className="text-2xl md:text-3xl font-serif italic text-amber-900 leading-relaxed">
                     "{item}"
                   </p>
                 </div>
               ))}
             </div>
          </div>
        );

      case SlideType.CONTENT_COLUMNS:
        // Split content approximately in half for two columns
        const midPoint = Math.ceil((slide.content?.length || 0) / 2);
        const col1 = slide.content?.slice(0, midPoint);
        const col2 = slide.content?.slice(midPoint);

        return (
          <div className="flex flex-col h-full max-w-6xl mx-auto pt-10">
            <div className="flex items-center gap-4 mb-12">
               <Layers size={40} />
               <h2 className="text-4xl md:text-5xl font-bold">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                {col1?.map((item, i) => (
                   <p key={i} className={`text-xl md:text-2xl ${item.startsWith('**') ? 'font-bold mt-6 text-emerald-800' : ''}`}>
                     {item.replace(/\*\*/g, '')}
                   </p>
                ))}
              </div>
              <div className="space-y-4">
                {col2?.map((item, i) => (
                   <p key={i} className={`text-xl md:text-2xl ${item.startsWith('**') ? 'font-bold mt-6 text-emerald-800' : ''}`}>
                     {item.replace(/\*\*/g, '')}
                   </p>
                ))}
              </div>
            </div>
          </div>
        );

      case SlideType.TABLE:
        return (
          <div className="flex flex-col h-full max-w-6xl mx-auto pt-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">{slide.title}</h2>
            <div className="overflow-hidden rounded-xl shadow-lg border border-blue-200">
              <table className="w-full text-lg md:text-xl bg-white/80 backdrop-blur">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    {slide.tableHeaders?.map((h, i) => (
                      <th key={i} className="p-5 text-right font-bold border-b border-blue-900">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {slide.tableRows?.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-blue-50 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`p-5 ${cIdx === 0 ? 'font-bold text-blue-900' : 'text-slate-700'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case SlideType.CHART:
        return (
          <div className="flex flex-col h-full max-w-5xl mx-auto pt-8">
            <div className="flex items-center gap-4 mb-8">
               <Activity size={40} />
               <h2 className="text-4xl font-bold">{slide.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full pb-8">
              <ul className="space-y-5">
                {slide.content?.map((item, idx) => (
                  <li key={idx} className="text-xl md:text-2xl flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-zinc-800 rounded-full shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="w-full">
                {slide.chartData && <SeismographChart data={slide.chartData} />}
                <div className="mt-4 text-center text-sm text-zinc-500 bg-white/50 p-2 rounded">
                  * محاكاة: لاحظ تأخر وصول الموجات S عن P
                </div>
              </div>
            </div>
          </div>
        );

      case SlideType.DIAGRAM:
        return (
          <div className="flex flex-col h-full max-w-5xl mx-auto pt-8">
             <div className="flex items-center gap-4 mb-10">
               <Radio size={40} />
               <h2 className="text-4xl font-bold">{slide.title}</h2>
            </div>
            <div className="bg-white/60 p-8 rounded-3xl shadow-lg backdrop-blur-sm border border-white/40 flex-grow mb-12 flex flex-col justify-center">
              <div className="grid gap-6">
                {slide.content?.map((item, idx) => {
                  const isTitle = item.startsWith('**');
                  return (
                    <div key={idx} className={`flex gap-4 ${isTitle ? 'items-center' : 'items-start pl-8'}`}>
                      {isTitle && <Zap className="text-amber-600 shrink-0" size={24} />}
                      <p className={`text-xl md:text-2xl ${isTitle ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                        {item.replace(/\*\*/g, '')}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {/* Simple Visual for Shadow Zones if this is slide 10 or similar */}
              {slide.id === 12 && (
                 <div className="mt-8 flex justify-center items-center gap-8 opacity-70">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full border-4 border-slate-400 bg-slate-200 flex items-center justify-center mb-2 mx-auto relative overflow-hidden">
                        <div className="absolute inset-0 bg-indigo-500/20" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }}></div>
                      </div>
                      <span className="text-sm font-bold">P-Wave Shadow</span>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full border-4 border-slate-400 bg-slate-200 flex items-center justify-center mb-2 mx-auto relative overflow-hidden">
                         <div className="w-12 h-12 rounded-full bg-orange-300"></div>
                      </div>
                      <span className="text-sm font-bold">Liquid Core blocks S</span>
                    </div>
                 </div>
              )}
            </div>
          </div>
        );

      case SlideType.IMAGE_GRID:
        return (
          <div className="flex flex-col h-full max-w-7xl mx-auto pt-6">
            <div className="flex items-center gap-4 mb-8">
               <ImageIcon size={40} />
               <h2 className="text-4xl font-bold">{slide.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full pb-8">
              {slide.images?.map((img, idx) => (
                <div key={idx} className="flex flex-col h-full bg-white/60 p-4 rounded-xl shadow-lg border border-white/50">
                  <div className="flex-grow relative rounded-lg overflow-hidden bg-white mb-4">
                    <img 
                      src={img.url} 
                      alt={img.caption} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  {img.caption && (
                    <p className="text-xl text-center font-bold text-slate-800 py-2 border-t border-slate-200">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans text-right" dir="rtl">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
         <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-[-100px] left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] aspect-video max-h-[90vh]">
        {/* Slide Container */}
        {slide.type === SlideType.TITLE && slide.backgroundImage ? (
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative">
             <img src={slide.backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm"></div>
             <div className="relative z-10 h-full p-12 text-white">
                {renderContent()}
             </div>
          </div>
        ) : (
          <SlideLayout themeColor={slide.themeColor || 'slate'}>
            {renderContent()}
          </SlideLayout>
        )}
      </div>

      <Controls 
        onNext={handleNext} 
        onPrev={handlePrev} 
        onReset={() => setCurrentSlideIndex(0)}
        current={currentSlideIndex} 
        total={SLIDES.length} 
      />

      {/* Tailwind Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeIn:nth-child(1) { animation-delay: 0.1s; }
        .animate-fadeIn:nth-child(2) { animation-delay: 0.2s; }
        .animate-fadeIn:nth-child(3) { animation-delay: 0.3s; }
        .animate-fadeIn:nth-child(4) { animation-delay: 0.4s; }
        .animate-fadeIn:nth-child(5) { animation-delay: 0.5s; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;