import { ThemeContext } from './index'

export default function ThemeContextProvider({
  children,
  theme,
  themeName,
  setTheme
}) {
  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}