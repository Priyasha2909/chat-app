// ToggleButton.js
import React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "./ThemeContext";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ToggleButton = () => {
  const { toggleTheme, themeMode } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {themeMode === "light" ? (
        <SunIcon color="orange.200" />
      ) : (
        <MoonIcon color="blue.700" />
      )}
    </Button>
  );
};

export default ToggleButton;
