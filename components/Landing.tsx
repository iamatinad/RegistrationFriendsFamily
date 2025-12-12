import React, { useState, useEffect } from 'react';
import { AttendeeType } from '../types';
import { Button } from './ui/Button';
import f1 from "./assets/F1.jpg";
import f2 from "./assets/F2.jpg";
import f3 from "./assets/F3.jpg";




interface LandingProps {
  onSelectType: (type: AttendeeType) => void;
}

const collageImages = [f1, f2, f3];

// Typewriter Hook with Loop
const useTypewriter = (text: string, speed = 100, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = text;
      
      setDisplayText(current => {
        if (isDeleting) {
          return fullText.substring(0, current.length - 1);
        } else {
          return fullText.substring(0, current.length + 1);
        }
      });

      // Speed adjustments
      setTypingSpeed(isDeleting ? speed / 2 : speed);

      // Phases
      if (!isDeleting && displayText === fullText) {
        // Finished typing, pause before deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
        setTypingSpeed(pauseTime); 
      } else if (isDeleting && displayText === '') {
        // Finished deleting, start over
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); 
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, text, speed, pauseTime, typingSpeed]);

  return displayText;
};

export const Landing: React.FC<LandingProps> = ({ onSelectType }) => {
  const welcomeText = useTypewriter("Welcome to Friends & Family 2025", 80, 2500);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full relative overflow-hidden px-4">
      
      {/* Image Collage Section */}
      <div className="w-full max-w-4xl mx-auto mb-10 md:mb-12 mt-16 md:mt-12">
        <div className="flex justify-center items-center gap-4 md:gap-8">
          
          {/* Left Image - Tilted Left */}
          <div className="relative w-28 h-40 md:w-44 md:h-64 transform -rotate-6 translate-y-4 transition-transform hover:rotate-0 hover:scale-105 hover:z-10 duration-500">
            <div className="absolute inset-0 bg-brand-purple rounded-2xl shadow-xl border-2 border-white/10 overflow-hidden">
              <img 
                src={collageImages[0]} 
                alt="Community" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/60 to-transparent" />
            </div>
          </div>

          {/* Center Image - Prominent & Straight */}
          <div className="relative w-36 h-48 md:w-56 md:h-72 z-10 transform transition-transform hover:scale-105 duration-500">
            <div className="absolute inset-0 bg-brand-purple rounded-[2rem] shadow-2xl border-4 border-white/20 overflow-hidden">
               <img 
                src={collageImages[1]} 
                alt="Friends" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/40 to-transparent" />
            </div>
            {/* Glow effect behind center image */}
            <div className="absolute -inset-4 bg-brand-yellow/20 blur-xl -z-10 rounded-full" />
          </div>

          {/* Right Image - Tilted Right */}
          <div className="relative w-28 h-40 md:w-44 md:h-64 transform rotate-6 translate-y-4 transition-transform hover:rotate-0 hover:scale-105 hover:z-10 duration-500">
             <div className="absolute inset-0 bg-brand-purple rounded-2xl shadow-xl border-2 border-white/10 overflow-hidden">
              <img 
                src={collageImages[2]} 
                alt="Worship" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/60 to-transparent" />
            </div>
          </div>

        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-30 w-full max-w-4xl mx-auto px-2 md:px-6 pb-8 md:pb-12 text-center space-y-8 animate-slide-up">
        <h1 className="min-h-[3em] md:min-h-[2em] text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight flex flex-col md:block items-center justify-center">
          <span className="text-white block md:inline drop-shadow-2xl">
            {welcomeText}
          </span>
          <span className="inline-block w-1 h-8 md:h-12 ml-1 bg-brand-yellow animate-cursor align-middle opacity-50 shadow-[0_0_10px_#F4B942]"></span>
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full">
          <Button 
            onClick={() => onSelectType('Visitor')}
            variant="primary"
            className="w-full sm:w-auto min-w-[240px] shadow-brand-green/30 text-lg h-14"
            icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>}
          >
            Visitor Registration
          </Button>
          
          <Button 
            onClick={() => onSelectType('Member')}
            variant="secondary"
            className="w-full sm:w-auto min-w-[240px] text-lg h-14"
          >
            Member Access
          </Button>
        </div>
      </div>
    </div>
  );
};