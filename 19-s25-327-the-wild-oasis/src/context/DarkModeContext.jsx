import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
//1 create context
const DarkModeContext = createContext();

//2- creates the provider
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode],
  );

  function toggleDarkMode() {
    setIsDarkMode((mode) => !mode);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//3- custom hook to use the context provider
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside fo the DarkModeProvider");
  return context;
}

//4- export the provider and the hook
// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
