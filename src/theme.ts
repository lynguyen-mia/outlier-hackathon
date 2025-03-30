import { createTheme } from "@mui/material/styles";

const oceanBlue = "#0066cc";
const darkBlue = "#1a1f2c";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: oceanBlue,
      light: "#3399ff",
      dark: "#004c99",
    },
    background: {
      default: "#f5f8fa",
      paper: "rgba(255, 255, 255, 0.8)",
    },
    text: {
      primary: "#1a1f2c",
      secondary: "#4a5568",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9F7AEA",
      light: "#B794F4",
      dark: "#6B46C1",
    },
    secondary: {
      main: "#E9D8FD",
      light: "#F3E8FD",
      dark: "#D6BCFA",
    },
    background: {
      default: "#1A1B2E",
      paper: "#232442",
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#CBD5E1",
    },
    divider: "rgba(233, 216, 253, 0.12)",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(26, 31, 44, 0.8)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(26, 31, 44, 0.8)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            color: "#F1F5F9",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(233, 216, 253, 0.3)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(233, 216, 253, 0.5)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9F7AEA",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(233, 216, 253, 0.7)",
            "&.Mui-focused": {
              color: "#9F7AEA",
            },
          },
          "& .MuiHelperText-root": {
            color: "#FF4842",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#F1F5F9",
          borderColor: "rgba(233, 216, 253, 0.1)",
        },
        head: {
          color: "#E9D8FD",
          fontWeight: 600,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#F1F5F9",
        },
        h6: {
          color: "#E9D8FD",
          fontWeight: 600,
        },
        subtitle1: {
          color: "#CBD5E1",
        },
        subtitle2: {
          color: "#CBD5E1",
        },
        body1: {
          color: "#F1F5F9",
        },
        body2: {
          color: "#CBD5E1",
        },
      },
    },
  },
});
