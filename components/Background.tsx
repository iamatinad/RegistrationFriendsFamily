import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep Purple Base */}
      <div className="absolute inset-0 bg-[#1a102e]" />
      
      {/* Ambient Orbs - Matching Green/Yellow/Purple theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple-light/20 rounded-full blur-[120px] opacity-40 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[100px] opacity-30" />
      <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[130px]" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.04]" />
    </div>
  );
};