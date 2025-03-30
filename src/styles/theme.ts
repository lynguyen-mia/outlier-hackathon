import { createTheme, Theme } from "@mui/material/styles";

// Modern color palette with elegant purple gradients
const colors = {
  // Primary colors - Elegant purple gradients
  primary: {
    main: "#9F7AEA", // Soft purple
    light: "#E9D8FD", // Light lavender
    dark: "#6B46C1", // Deep purple
    gradient: "linear-gradient(135deg, #9F7AEA 0%, #E9D8FD 100%)",
  },
  // Secondary colors - Soft lavender
  secondary: {
    main: "#B794F4",
    light: "#EDF2F7",
    dark: "#805AD5",
    gradient: "linear-gradient(135deg, #B794F4 0%, #EDF2F7 100%)",
  },
  // Accent colors - Rose for contrast
  accent: {
    main: "#F687B3",
    light: "#FED7D7",
    dark: "#ED64A6",
    gradient: "linear-gradient(135deg, #F687B3 0%, #FED7D7 100%)",
  },
  // Success colors - Emerald
  success: {
    main: "#48BB78",
    light: "#9AE6B4",
    dark: "#38A169",
    gradient: "linear-gradient(135deg, #48BB78 0%, #9AE6B4 100%)",
  },
  // Error colors - Rose
  error: {
    main: "#F56565",
    light: "#FEB2B2",
    dark: "#E53E3E",
    gradient: "linear-gradient(135deg, #F56565 0%, #FEB2B2 100%)",
  },
};

// Common styles shared between light and dark modes
const commonStyles = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
        head: {
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          background: colors.primary.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        },
        h2: {
          background: colors.secondary.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        },
        h3: {
          background: colors.accent.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
};

// Light theme
export const lightTheme = createTheme({
  ...commonStyles,
  palette: {
    mode: "light",
    primary: {
      main: "#6B46C1",
      light: "#9F7AEA",
      dark: "#553C9A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#B794F4",
      light: "#D6BCFA",
      dark: "#9F7AEA",
      contrastText: "#FFFFFF",
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
    },
    background: {
      default: "linear-gradient(135deg, #F3E8FD 0%, #E9D8FD 100%)",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
  },
  components: {
    ...commonStyles.components,
    MuiCard: {
      styleOverrides: {
        root: {
          ...commonStyles.components.MuiCard.styleOverrides.root,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          "&.gradient-primary": {
            background: colors.primary.gradient,
            color: "#FFFFFF",
          },
          "&.gradient-secondary": {
            background: colors.secondary.gradient,
            color: "#FFFFFF",
          },
          "&.gradient-accent": {
            background: colors.accent.gradient,
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  ...commonStyles,
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
    },
    background: {
      default: "linear-gradient(135deg, #2D3748 0%, #1A202C 100%)",
      paper: "rgba(26, 32, 44, 0.7)",
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#94A3B8",
    },
  },
  components: {
    ...commonStyles.components,
    MuiCard: {
      styleOverrides: {
        root: {
          ...commonStyles.components.MuiCard.styleOverrides.root,
          backgroundColor: "rgba(26, 32, 44, 0.7)",
          "&.gradient-primary": {
            background: colors.primary.gradient,
            color: "#FFFFFF",
          },
          "&.gradient-secondary": {
            background: colors.secondary.gradient,
            color: "#FFFFFF",
          },
          "&.gradient-accent": {
            background: colors.accent.gradient,
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "rgba(148, 163, 184, 0.1)",
        },
      },
    },
  },
});

// Custom gradients for cards
export const cardGradients = {
  primary: colors.primary.gradient,
  secondary: colors.secondary.gradient,
  accent: colors.accent.gradient,
  success: colors.success.gradient,
  error: colors.error.gradient,
};

export default lightTheme;
