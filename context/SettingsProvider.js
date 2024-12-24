import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Settings Context
export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
  const [isInternetConnected, setIsInternetConnected] = useState(false);
  const [isGPSConnected, setIsGPSConnected] = useState(false);
  const [language, setLanguage] = useState('English');
  const [mediaQuality, setMediaQuality] = useState(50);
  const [logSaveLocation, setLogSaveLocation] = useState('');
  const [deviceIdentifier, setDeviceIdentifier] = useState('');

  // Function to load settings from AsyncStorage
  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setLanguage(settings.language);
        setIsInternetConnected(settings.isInternetConnected);
        setIsGPSConnected(settings.isGPSConnected);
        setMediaQuality(settings.mediaQuality);
        setLogSaveLocation(settings.logSaveLocation);
        setDeviceIdentifier(settings.deviceIdentifier);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        isInternetConnected,
        setIsInternetConnected,
        isGPSConnected,
        setIsGPSConnected,
        language,
        setLanguage,
        mediaQuality,
        setMediaQuality,
        logSaveLocation,
        setLogSaveLocation,
        deviceIdentifier,
        setDeviceIdentifier,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};
