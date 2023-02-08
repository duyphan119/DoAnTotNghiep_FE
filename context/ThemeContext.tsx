import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type Theme = "light" | "dark";

const NAME = "admin-theme-mode";

const ThemeContext = createContext({} as any);

type Props = Partial<{
  children: ReactNode;
}>;

const ThemeWrapper = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(NAME, newTheme);
  };

  useEffect(() => {
    const theme = localStorage.getItem(NAME);
    if (!theme || theme === "light") setTheme("light");
    else setTheme("dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeContext() {
  return useContext(ThemeContext);
}

export default ThemeWrapper;
