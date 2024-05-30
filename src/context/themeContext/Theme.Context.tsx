import { createContext, useContext, useState } from "react";
import { CustomProviderProps } from "rsuite";

export interface IThemeState {
  theme: CustomProviderProps["theme"];
  onChangeTheme: (newTheme: CustomProviderProps["theme"]) => void;
};

const ThemeContext = createContext<IThemeState | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<IThemeState["theme"]>("dark");

  const onChangeTheme = (newTheme: IThemeState["theme"]) => {
    setTheme(newTheme);
  };

  const value = {
    theme,
    onChangeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeContext'
    );
  }
  return context;
};