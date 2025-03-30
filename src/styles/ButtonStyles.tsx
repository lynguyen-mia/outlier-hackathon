import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: "none",
  fontWeight: 600,
  padding: "8px 16px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
  },
  "&.MuiButton-contained": {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
}));

export const PrimaryButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
  },
}));

export const SecondaryButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
    transform: "translateY(-2px)",
  },
}));

export const SuccessButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
    transform: "translateY(-2px)",
  },
}));

export const ErrorButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
    transform: "translateY(-2px)",
  },
}));
