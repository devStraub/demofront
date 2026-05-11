import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
    component="footer"
    sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw", 
        height: 50,
        backgroundColor: "#1976d2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
    }}
    >
      <Typography variant="body2">
        © 2026 DevStraub
      </Typography>
    </Box>
  );
}