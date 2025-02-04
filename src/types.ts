export interface SpirometryData {
  id: number;
  timestamp: string;
  fev1: number;
  fvc: number;
  pef: number;
  quality: number;
  fev1_fvc_ratio: number;
  device_status: 'connected' | 'disconnected';
  connection_type: 'wifi' | 'bluetooth';
  signal_strength: number;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
  medical_history: string[];
}

export interface ReferenceValue {
  fev1: number;
  fvc: number;
  pef: number;
  fev1_fvc_ratio: number;
}

export interface ForecastData {
  date: string;
  predicted_fev1: number;
  confidence_lower: number;
  confidence_upper: number;
  risk_level: 'low' | 'medium' | 'high';
}

export interface NotificationSettings {
  email: boolean;
  line: boolean;
  mobile: boolean;
  thresholds: {
    fev1: number;
    fvc: number;
    pef: number;
  };
}