import React, { useState } from 'react';
import { Background } from './components/Background';
import { Landing } from './components/Landing';
import { RegistrationForm } from './components/RegistrationForm';
import { Success } from './components/Success';
import { ViewState, AttendeeType, RegistrationFormData } from './types';

// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbUypAJMuEDhdISyB8TDPzZdUiRlSMgmSJyp8zDjpodSRDatFA9ZBy-hILtIDOwkqQ0g/exec"; 

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('LANDING');
  const [selectedType, setSelectedType] = useState<AttendeeType>(null);

  const handleSelectType = (type: AttendeeType) => {
    setSelectedType(type);
    setViewState('FORM');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setViewState('LANDING');
    setSelectedType(null);
  };

  const handleSubmit = async (data: RegistrationFormData) => {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn("Google Script URL is not set. Data will not be saved to sheets.");
      // Just simulate success if no URL is present for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      setViewState('SUCCESS');
      return;
    }

    // specific options to ensure Google Apps Script accepts the POST request
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        // mode: 'no-cors' is often necessary for simple Google Script POSTs 
        // to avoid preflight issues, though it makes the response opaque.
        mode: "no-cors", 
        headers: {
          "Content-Type": "application/json",
        },
      });
      setViewState('SUCCESS');
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Connection error. Please check your internet and try again.");
    }
  };

  const handleReset = () => {
    setSelectedType(null);
    setViewState('LANDING');
  };

  return (
    <div className="relative min-h-screen font-sans text-white selection:bg-brand-500/30 overflow-x-hidden">
      <Background />
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300 bg-gradient-to-b from-[#0f0f11] to-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            onClick={viewState !== 'LANDING' ? handleReset : undefined}
            className={`text-lg md:text-xl font-bold font-sans tracking-wide flex items-center gap-2 ${viewState !== 'LANDING' ? 'cursor-pointer' : ''}`}
          >
            {/* Logo Text Change */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              EWC DC CAMPUS
            </span>
          </div>
          
          {viewState !== 'LANDING' && (
             <button 
               onClick={handleReset}
               className="text-sm text-gray-400 hover:text-white transition-colors"
             >
               Back to Home
             </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`relative z-10 min-h-screen flex flex-col ${viewState === 'LANDING' ? 'justify-center' : 'pt-28 pb-12'} px-4 sm:px-6`}>
        {viewState === 'LANDING' && (
          <Landing onSelectType={handleSelectType} />
        )}

        {viewState === 'FORM' && selectedType && (
          <RegistrationForm 
            type={selectedType} 
            onBack={handleBack} 
            onSubmit={handleSubmit}
          />
        )}

        {viewState === 'SUCCESS' && (
          <Success onReset={handleReset} />
        )}
      </main>
    </div>
  );
};

export default App;