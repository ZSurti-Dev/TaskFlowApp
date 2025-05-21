import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Default translations to use when no translations prop is provided
const defaultTranslations = {
  settings: 'Settings',
  theme: 'Theme',
  toggle_theme: 'Toggle Theme',
  language: 'Language',
  english: 'English',
  polish: 'Polish',
  notifications: 'Notifications',
  time_format: 'Time Format',
  hour_12: '12-hour',  // Changed from 12_hour to hour_12
  hour_24: '24-hour',  // Changed from 24_hour to hour_24
  reset_data: 'Reset All Data',
  confirm_reset: 'Are you sure you want to reset all data? This action cannot be undone.',
  cancel: 'Cancel',
  reset: 'Reset'
};

const Settings = ({ 
  setTheme = () => {}, 
  setLanguage = () => {}, 
  setTimeFormat = () => {}, 
  setTasks = () => {},
  translations = defaultTranslations 
}) => {
  const [notifications, setNotifications] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTimeFormatChange = (e) => {
    setTimeFormat(e.target.value);
  };

  const handleReset = () => {
    setTasks([]);
    setShowResetConfirm(false);
  };

  // Use a safe access method for translations
  const t = (key) => translations[key] || defaultTranslations[key] || key;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
      <div className="flex items-center mb-4">
        <Link to="/home" className="text-gray-800 dark:text-white mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t('settings')}</h1>
      </div>
      <div className="flex-1 space-y-4">
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-white">{t('theme')}</span>
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
            >
              {t('toggle_theme')}
            </button>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-white">{t('language')}</span>
            <select
              onChange={handleLanguageChange}
              className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="en">{t('english')}</option>
              <option value="pl">{t('polish')}</option>
            </select>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-800 dark:text-white">{t('time_format')}</span>
            <select
              onChange={handleTimeFormatChange}
              className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="12-hour">{t('hour_12')}</option>
              <option value="24-hour">{t('hour_24')}</option>
            </select>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            {t('reset_data')}
          </button>
        </div>
      </div>
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-800 dark:text-white mb-4">{t('confirm_reset')}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                {t('reset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;