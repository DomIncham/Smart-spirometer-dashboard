import React from 'react';
import { UserProfile as UserProfileType, NotificationSettings } from '../types';
import { User, Bell, Moon } from 'lucide-react';

interface Props {
  profile: UserProfileType;
  notificationSettings: NotificationSettings;
  onUpdateProfile: (profile: UserProfileType) => void;
  onUpdateNotifications: (settings: NotificationSettings) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

export const UserProfile: React.FC<Props> = ({
  profile,
  notificationSettings,
  onUpdateProfile,
  onUpdateNotifications,
  onToggleTheme,
  isDarkMode,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold">User Profile</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Moon className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? 'text-yellow-500' : 'text-gray-500'}`} />
          </button>
          <button
            onClick={() => {/* Open notifications modal */}}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4 text-sm sm:text-base">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-gray-600">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdateProfile({ ...profile, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 text-sm sm:text-base"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-600">Age</label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => onUpdateProfile({ ...profile, age: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-600">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => onUpdateProfile({ ...profile, gender: e.target.value as 'male' | 'female' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 text-sm sm:text-base"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-600">Height (cm)</label>
                <input
                  type="number"
                  value={profile.height}
                  onChange={(e) => onUpdateProfile({ ...profile, height: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-600">Weight (kg)</label>
                <input
                  type="number"
                  value={profile.weight}
                  onChange={(e) => onUpdateProfile({ ...profile, weight: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-sm sm:text-base">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm text-gray-600">Email Notifications</label>
              <input
                type="checkbox"
                checked={notificationSettings.email}
                onChange={(e) => onUpdateNotifications({
                  ...notificationSettings,
                  email: e.target.checked
                })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm text-gray-600">LINE Notifications</label>
              <input
                type="checkbox"
                checked={notificationSettings.line}
                onChange={(e) => onUpdateNotifications({
                  ...notificationSettings,
                  line: e.target.checked
                })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm text-gray-600">Mobile App Notifications</label>
              <input
                type="checkbox"
                checked={notificationSettings.mobile}
                onChange={(e) => onUpdateNotifications({
                  ...notificationSettings,
                  mobile: e.target.checked
                })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};