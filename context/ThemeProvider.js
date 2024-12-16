import React, {createContext, useContext, useState} from 'react';

// Create a Theme Context
const ThemeContext = createContext();

// Default light theme
const lightTheme = {
  background: 'rgba(255, 255, 255, 0.7)',
  text: 'rgba(0, 0, 0, 0.7)',
  button: 'rgba(255, 255, 255, 0.6)',
  buttonText: 'black',
  icon: 'black',
  border:'rgba(0, 0, 0, 0.6)',
};

// Dark theme
const darkTheme = {
  background: 'rgba(0, 0, 0, 0.7)',
  text: 'rgba(255, 255, 255, 0.7)',
  button: 'rgba(0, 0, 0, 0.6)',
  buttonText: 'white',
  icon: 'white',
  border:'rgba(255, 255, 255, 0.6)',

};

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
