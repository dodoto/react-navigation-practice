import React, { useContext } from 'react';

// theme context
export const ThemeContext = React.createContext({});
export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  return context
}
