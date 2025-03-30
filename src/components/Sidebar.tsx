import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Sidebar: React.FC = () => {
  const theme = useTheme();

  return (
    <div>
      {/* Existing code */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          color: theme.palette.mode === "dark" ? "#E9D8FD" : "#6B46C1",
          fontSize: "1rem",
          letterSpacing: "0.5px",
          opacity: 0.95,
        }}
      >
        {/* Replace with actual title text or pass item as a prop */}
        Title
      </Typography>
      {/* Existing code */}
    </div>
  );
};

export default Sidebar;
