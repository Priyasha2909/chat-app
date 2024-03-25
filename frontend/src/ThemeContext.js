// ThemeContext.js
import React, { createContext, useState, useContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        light: "#ff7f50",
        main: "#ff6347",
        dark: "#ff4500",
        contrastText: "#fff",
      },
      secondary: {
        light: "#6495ed",
        main: "#4169e1",
        dark: "#00008b",
        contrastText: "#fff",
      },
      background: {
        paper: themeMode === "light" ? "#ffffff" : "#333333",
        default: themeMode === "light" ? "#f0f0f0" : "#222222",
      },
      text: {
        primary: themeMode === "light" ? "#333333" : "#f0f0f0",
        secondary: themeMode === "light" ? "#666666" : "#dddddd",
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// // // ThemeProvider.js
// // import React from "react";
// // import { ThemeProvider, createTheme } from "@mui/material/styles";

// // const theme = createTheme({
// //   palette: {
// //     background: {
// //       default: "#009843", // Change this to your desired background color
// //       alternate: "#0D0D0D",
// //     },
// //   },
// // });

// // function MyThemeProvider({ children }) {
// //   return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
// // }

// // export default MyThemeProvider;
