import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";

interface LoadingEffectProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: "page" | "content";
}

const LoadingEffect: React.FC<LoadingEffectProps> = ({
  isLoading,
  children,
  type = "content",
}) => {
  const theme = useTheme();

  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        position: type === "page" ? "fixed" : "relative",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: type === "page" ? "transparent" : "transparent",
        zIndex: type === "page" ? 1000 : 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 3,
          borderRadius: "20px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          backdropFilter: "blur(10px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.3)"
              : "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CircularProgress
          size={40}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.875rem",
            fontWeight: 500,
            animation: "fadeInOut 1.5s ease-in-out infinite",
          }}
        >
          Loading...
        </Box>
      </Box>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes fadeInOut {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingEffect;
