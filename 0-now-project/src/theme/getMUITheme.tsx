import { createTheme } from "@mui/material/styles";

export const getMuiTheme = (mode: "light" | "dark") => {
  const selectedStyle = {
    "&.Mui-selected": {
      backgroundColor: mode === "light" ? "#1976d2" : "#90caf9",
      color: mode === "light" ? "#fff" : "#000",
    },
    "&.Mui-selected:hover": {
      backgroundColor: mode === "light" ? "#115293" : "#e3f2fd",
    },
  };
  const hoverStyle = {
    "&:hover": {
      backgroundColor: mode === "light" ? "#1976d2" : "#90caf9",
      color: mode === "light" ? "#fff !important" : "#000 !important",
    },
  };
  const colorStyle = {
    "&": {
      color: mode === "light" ? {} : "#fff",
    },
  };
  const disabledColorStyle = {
    "&.Mui-disabled": {
      color: mode === "light" ? "{}" : "#555",
    },
  };
  const selectedBackgroundStyle = {
    "&": {
      backgroundColor: mode === "light" ? "#f9f9f9" : {},
    },
    "&.MuiAlert-filledSuccess": { backgroundColor: "rgb(56,142,60)" },
    "&.MuiAlert-filledError": { backgroundColor: "rgb(211,47,47)" },
  };

  const baseTheme = createTheme();

  return createTheme({
    palette: {
      ...baseTheme.palette, // ✅ 保留所有預設
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      background: {
        default: mode === "light" ? "#fff" : "#121212",
      },
      text: {
        primary: mode === "light" ? "#000" : "#fff",
        secondary: mode === "light" ? "#555" : "#ccc",
      },
    },
    components: {
      ...baseTheme.components,
      MuiCssBaseline: {
        styleOverrides: {},
      },
      MuiMenuItem: { styleOverrides: { root: selectedStyle } },
      MuiListItem: { styleOverrides: { root: selectedStyle } },
      MuiIconButton: {
        styleOverrides: {
          root: { ...hoverStyle, ...colorStyle, ...disabledColorStyle },
        },
      },
      MuiPaper: { styleOverrides: { root: selectedBackgroundStyle } },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&.MuiInputBase-multiline": {
              backgroundColor: mode === "light" ? "#fff" : "#222",
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            "&.MuiSelect-icon": {
              color: mode === "light" ? "#000" : "#fff",
            },
          },
        },
      },
    },
  });
};
