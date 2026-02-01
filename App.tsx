
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, Info, ArrowRight, Image as ImageIcon, Edit3, Check, Download, Layout } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { CARD_DATA, EXTERNAL_DONATION_URL } from './constants';
import { CardContent } from './types';

const STORAGE_KEY = 'gongjon_studio_local_v1';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [localImages, setLocalImages] = useState<Record<number, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLocalImages(JSON.parse(saved));
      } catch (e) {
        console.error("데이터 복원 실패", e);
      }
    }
  }, []);

  const handleNext = () => {
    if (currentIndex < CARD_DATA.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsSaving(true);
    try {
      const dataUrl = await toJpeg(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `공존_카드뉴스_${currentIndex + 1}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('이미지 생성에 실패했습니다. 최신 브라우저를 사용해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (cardId: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const updated = { ...localImages, [cardId]: result };
      setLocalImages(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentIndex * scrollRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {/* Studio Toolbar */}
      <div className="w-full max-w-[400px] mb-6 flex justify-between items-center bg-slate-900 text-white rounded-2xl shadow-2xl px-5 py-3 border border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
            <Layout className="w-5 h-5 text-slate-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-black tracking-tighter uppercase">Canvas Studio</span>
            <span className="text-[9px] text-emerald-400 font-bold opacity-80 uppercase tracking-widest">Gong-Jon Project</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`p-2 rounded-xl transition-all ${isEditMode ? 'bg-emerald-500 text-slate-900 shadow-inner' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            {isEditMode ? <Check className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
          </button>
          <button 
            onClick={handleDownload}
            disabled={isSaving}
            className={`p-2 rounded-xl transition-all ${isSaving ? 'opacity-30' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Design Canvas */}
      <div 
        ref={cardRef}
        className="relative w-full max-w-[400px] aspect-[3/4] overflow-hidden rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] bg-white border-[8px] border-slate-900"
      >
        <div 
          ref={scrollRef}
          className="flex w-full h-full overflow-x-hidden no-scrollbar"
        >
          {CARD_DATA.map((card, idx) => (
            <CardItem 
              key={card.id} 
              card={card} 
              customImage={localImages[card.id]}
              isEditMode={isEditMode}
              isActive={currentIndex === idx}
              onImageUpload={(file) => handleImageUpload(card.id, file)}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="absolute top-8 left-0 right-0 flex justify-center space-x-2 z-30">
          {CARD_DATA.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-8 bg-white shadow-lg' : 'w-2 bg-white/30 backdrop-blur-sm'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="w-full max-w-[400px] mt-8 space-y-6">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Canvas Live Viewer</span>
           </div>
           <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step {currentIndex + 1} of {CARD_DATA.length}</span>
        </div>
        
        {currentIndex === CARD_DATA.length - 1 ? (
          <button 
            onClick={() => window.open(EXTERNAL_DONATION_URL, '_blank')}
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[32px] shadow-2xl transform active:scale-95 transition-all flex items-center justify-center space-x-3"
          >
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-[18px] font-black">우리의 울타리 되어주기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex space-x-3">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-300 rounded-2xl flex items-center justify-center disabled:opacity-20 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              className="flex-[3] py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl flex items-center justify-center space-x-2 transform active:scale-[0.98] transition-all"
            >
              <span className="text-[15px]">스토리 계속 읽기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="bg-slate-800 text-slate-300 p-5 rounded-[28px] flex items-start space-x-4 shadow-xl border border-white/5">
           <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
           <p className="text-[11px] leading-relaxed font-medium opacity-80">
             상단 [편집] 버튼을 눌러 사진을 센터 활동사진으로 교체할 수 있습니다. 완성된 이미지는 [다운로드] 버튼을 눌러 소장하거나 홍보용으로 사용하세요.
           </p>
        </div>
      </div>
    </div>
  );
};

interface CardItemProps {
  card: CardContent;
  customImage?: string;
  isEditMode: boolean;
  isActive: boolean;
  onImageUpload: (file: File) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, customImage, isEditMode, isActive, onImageUpload, onNext, onPrev }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAreaClick = (e: React.MouseEvent) => {
    if (isEditMode) {
      fileInputRef.current?.click();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) onPrev();
    else onNext();
  };

  return (
    <div className="min-w-full h-full relative flex flex-col cursor-pointer overflow-hidden bg-slate-900" onClick={handleAreaClick}>
      <div className="absolute inset-0 z-0">
        <img 
          src={customImage || card.imageUrl} 
          alt={card.title} 
          className="w-full h-full object-cover transition-transform duration-[5000ms] ease-out opacity-75"
          style={{ transform: isActive ? 'scale(1.15)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      </div>

      {isEditMode && (
        <div className="absolute inset-0 z-40 bg-emerald-950/60 backdrop-blur-sm flex items-center justify-center border-4 border-dashed border-emerald-400/50 m-6 rounded-[30px]">
          <div className="bg-white px-6 py-5 rounded-2xl flex flex-col items-center space-y-2 shadow-2xl transform active:scale-95 transition-transform">
            <ImageIcon className="w-6 h-6 text-emerald-600" />
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">Photo Upload</span>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageUpload(file);
            }} />
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full justify-end p-10 pb-16 text-white pointer-events-none">
        {card.subtitle && (
          <div className="mb-5">
            <span className="fixed-subtitle inline-block px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-lg ring-1 ring-white/20">
              {card.subtitle}
            </span>
          </div>
        )}
        <h2 className="fixed-title mb-6 whitespace-pre-line drop-shadow-2xl">{card.title}</h2>
        <div className="space-y-4 mb-10">
          {card.description.map((line, i) => (
            <p key={i} className="fixed-body opacity-90 tracking-tight drop-shadow-md">{line}</p>
          ))}
        </div>
        {card.highlightText && (
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 w-fit px-5 py-3 rounded-2xl shadow-xl">
            <Heart className="w-4 h-4 text-emerald-400 fill-current animate-pulse" />
            <span className="text-[13px] font-black text-emerald-50 tracking-tight">{card.highlightText}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
