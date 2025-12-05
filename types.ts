
export enum Page {
  Home = 'HOME',
  Map = 'MAP',
  Audit = 'AUDIT',
  Training = 'TRAINING',
  Feedback = 'FEEDBACK',
  Admin = 'ADMIN',
}

export enum UserRole {
  Tourist = 'Tourist',
  Operator = 'Operator',
  Admin = 'Admin',
}

export interface User {
  id: string;
  email: string;
  password?: string; // Should be hashed in a real app
  role: UserRole;
}

export enum FacilityType {
  Hotel = 'Hotel',
  Restaurant = 'Restaurant',
  Attraction = 'Attraction',
  Other = 'Other',
}

export interface AccessibilityFeatures {
  wheelchairAccess: boolean;
  visualImpairmentSupport: boolean;
  hearingImpairmentSupport: boolean;
}

export interface Facility extends AccessibilityFeatures {
  id: string;
  name: string;
  type: FacilityType;
  location: { lat: number; lng: number };
  address: string;
  image: string;
}

export interface Audit {
  id: string;
  facilityName: string;
  facilityType: FacilityType;
  features: AccessibilityFeatures;
  comments: string;
  imageFile?: string; // Represents file name in MVP
  submittedBy: string;
}

export interface Feedback {
  id: string;
  rating: number;
  review: string;
  submittedBy: string;
}
