import React, { useEffect } from 'react';
import { Check, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/Button';

interface SuccessProps {
  onReset: () => void;
}

export const Success: React.FC<SuccessProps> = ({ onReset }) => {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-lg mx-auto px-4 text-center animate-slide-up mt-12">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-brand-green blur-2xl opacity-20 rounded-full"></div>
        <div className="relative w-24 h-24 bg-gradient-to-br from-brand-green to-brand-green-dark rounded-full flex items-center justify-center shadow-xl shadow-brand-green/30 border-2 border-brand-green-light/20">
          <Check size={48} className="text-white" />
        </div>
      </div>

      <h2 className="text-4xl font-serif font-bold text-white mb-4">You're Registered!</h2>
      <p className="text-gray-400 mb-10 text-lg">
        Thank you for joining us. Your spot is reserved for <span className="text-brand-yellow font-medium">Friends & Family 2025</span>.
      </p>


      <Button variant="secondary" onClick={onReset}>
        Register Another Person
      </Button>
    </div>
  );
};