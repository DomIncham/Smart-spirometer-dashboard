import React, { useState } from 'react';
import { RealTimeMonitoring } from './components/RealTimeMonitoring';
import { HistoricalTrends } from './components/HistoricalTrends';
import { RiskAnalysis } from './components/RiskAnalysis';
import { UserProfile } from './components/UserProfile';
import { PDFReport } from './components/PDFReport';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FileDown, Stethoscope } from 'lucide-react';
import type { SpirometryData, UserProfile as UserProfileType, NotificationSettings, ReferenceValue, ForecastData } from './types';

// Sample data with proper ISO date strings
const sampleData: SpirometryData[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(), // One hour intervals
  fev1: 3.2 + Math.random() * 0.4 - 0.2,
  fvc: 4.1 + Math.random() * 0.4 - 0.2,
  pef: 8.5 + Math.random() * 1 - 0.5,
  quality: 95 - Math.random() * 10,
  fev1_fvc_ratio: 0.78 + Math.random() * 0.04 - 0.02,
  device_status: 'connected',
  connection_type: 'wifi',
  signal_strength: 85
}));

const sampleProfile: UserProfileType = {
  id: '1',
  name: 'John Doe',
  age: 35,
  height: 175,
  weight: 70,
  gender: 'male',
  medical_history: ['Asthma']
};

const sampleNotificationSettings: NotificationSettings = {
  email: true,
  line: true,
  mobile: true,
  thresholds: {
    fev1: 2.5,
    fvc: 3.5,
    pef: 7.0
  }
};

const referenceValues: ReferenceValue = {
  fev1: 3.5,
  fvc: 4.5,
  pef: 9.0,
  fev1_fvc_ratio: 0.8
};

// Generate forecast data with proper date strings
const forecastData: ForecastData[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    date: date.toISOString().split('T')[0],
    predicted_fev1: 3.3 + Math.random() * 0.4 - 0.2,
    confidence_lower: 3.1 + Math.random() * 0.2 - 0.1,
    confidence_upper: 3.5 + Math.random() * 0.2 - 0.1,
    risk_level: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
  };
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState(sampleProfile);
  const [notificationSettings, setNotificationSettings] = useState(sampleNotificationSettings);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Stethoscope className={`w-6 h-6 sm:w-8 sm:h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`text-xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Smart Spirometer Dashboard
              </h1>
            </div>
            <PDFDownloadLink
              document={<PDFReport spirometryData={sampleData} forecastData={forecastData} />}
              fileName="spirometry-report.pdf"
              className={`inline-flex items-center gap-2 ${
                isDarkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base`}
            >
              <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
              Export PDF Report
            </PDFDownloadLink>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        <RealTimeMonitoring 
          data={sampleData}
          latestReading={sampleData[0]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HistoricalTrends 
            data={sampleData}
            referenceValues={referenceValues}
          />
          <RiskAnalysis forecastData={forecastData} />
        </div>
        <UserProfile
          profile={profile}
          notificationSettings={notificationSettings}
          onUpdateProfile={setProfile}
          onUpdateNotifications={setNotificationSettings}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />
      </main>
    </div>
  );
}

export default App;