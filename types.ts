export type AttendeeType = 'Member' | 'Visitor' | null;

export interface RegistrationFormData {
  attendeeType: AttendeeType;
  fullName: string;
  phoneNumber: string;
  email?: string;
  location?: string;
  visitorType?: 'First Timer' | 'Returning Visitor' | '';
  referralSource?: string;
}

export type ViewState = 'LANDING' | 'FORM' | 'SUCCESS';
