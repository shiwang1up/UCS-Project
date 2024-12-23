import React, {createContext, useState} from 'react';

// Create the Settings Context
export const SettingsContext = createContext();

export const SettingsProvider = ({children}) => {
  const [isInternetConnected, setIsInternetConnected] = useState(false);

  return (
    <SettingsContext.Provider value={{isInternetConnected, setIsInternetConnected}}>
      {children}
    </SettingsContext.Provider>
  );
};