import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { GlobalAlert } from "../shared/components/feedback/GlobalAlert";

export const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background:
          "linear-gradient(135deg, #4facfe, #8e44ad)",
      }}
    >
      <Outlet />
      <GlobalAlert />
    </Box>
  );
};