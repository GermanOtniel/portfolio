import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CustomProviderProps } from "rsuite";
import { getUserById } from "../../api";

export interface IThemeState {
  theme: CustomProviderProps["theme"];
  onChangeTheme: (newTheme: CustomProviderProps["theme"]) => void;
  language: "ES" | "EN";
  onChangeLanguage: (newLanguage: "ES" | "EN") => void;
};

const ThemeContext = createContext<IThemeState | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<IThemeState["theme"]>("dark");
  const [lang, setLang] = useState<IThemeState["language"]>("ES");

  const onChangeTheme = (newTheme: IThemeState["theme"]) => {
    setTheme(newTheme);
  };

  const onChangeLanguage = (newLanguage: "ES" | "EN") => {
    setLang(newLanguage);
  };

  const value = {
    theme,
    onChangeTheme,
    language: lang,
    onChangeLanguage,
  };

  const executeFirstRequestToActivateBack = useCallback(async () => {
    try {
      await getUserById("1");
    } catch (error) {
      console.log("First call to back");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    executeFirstRequestToActivateBack();
  }, [executeFirstRequestToActivateBack]);

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