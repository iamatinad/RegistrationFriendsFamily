import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AttendeeType, RegistrationFormData } from '../types';
import { Input, Select } from './ui/Input';
import { Button } from './ui/Button';

interface RegistrationFormProps {
  type: AttendeeType;
  onBack: () => void;
  onSubmit: (data: RegistrationFormData) => Promise<void> | void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ type, onBack, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>({
    attendeeType: type,
    fullName: '',
    phoneNumber: '',
    email: '',
    location: '',
    visitorType: '',
    referralSource: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData as RegistrationFormData);
    } catch (error) {
      console.error("Submission failed", error);
      alert("There was an issue submitting your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-slide-up pb-20 mt-8">
      <div className="mb-8 flex items-center">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors mr-4"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-serif font-bold text-white">
            {type === 'Member' ? 'Welcome Back' : 'Welcome, Friend'}
          </h2>
          <p className="text-brand-yellow/80 text-sm mt-1">
            {type === 'Member' 
              ? 'Please confirm your details for quick check-in.' 
              : 'Please fill in your details so we can welcome you properly.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl">
        <input type="hidden" name="attendeeType" value={type || ''} />

        {/* Common Fields */}
        <Input
          id="fullName"
          name="fullName"
          label="Full Name"
          placeholder="e.g. John Doe"
          value={formData.fullName}
          onChange={handleChange}
          required
          autoFocus
        />

        <Input
          id="phoneNumber"
          name="phoneNumber"
          label={type === 'Member' ? "Phone Number (Optional)" : "Phone Number"}
          placeholder="e.g. (555) 123-4567"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required={type === 'Visitor'}
        />

        {/* Visitor Specific Fields */}
        {type === 'Visitor' && (
          <div className="space-y-6 animate-fade-in">
            <Input
              id="email"
              name="email"
              label="Email Address (Optional)"
              placeholder="e.g. john@example.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              // Email is no longer required
            />

            <Input
              id="location"
              name="location"
              label="Where are you visiting from?"
              placeholder="Dansoman, Control"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                id="visitorType"
                name="visitorType"
                label="Visitor Type"
                value={formData.visitorType}
                onChange={handleChange}
                required
                options={[
                  { value: 'First Timer', label: 'First Timer' },
                  { value: 'Returning Visitor', label: 'Returning Visitor' }
                ]}
              />

              <Select
                id="referralSource"
                name="referralSource"
                label="How did you hear about us?"
                value={formData.referralSource}
                onChange={handleChange}
                required
                options={[
                  { value: 'Social Media', label: 'Social Media' },
                  { value: 'Friend', label: 'Friend' },
                  { value: 'Family', label: 'Family' },
                  { value: 'Other', label: 'Other' }
                ]}
              />
            </div>
          </div>
        )}

        <div className="pt-4">
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isSubmitting}
            variant="primary"
            icon={type === 'Member' ? <CheckCircle2 size={18} /> : undefined}
          >
            {type === 'Member' ? 'Confirm Check-in' : 'Complete Registration'}
          </Button>
        </div>
      </form>
      
      {/* Footer Branding Helper */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-xs">Empowerment Worship Center • Dansoman Campus</p>
      </div>
    </div>
  );
};