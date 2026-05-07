import { Box, Typography } from "@mui/material";

export function HomePage() {
  return (
    <Box>
      <Typography variant="h4">Home</Typography>
      <Typography sx={{ mt: 2 }}>
        Bem-vindo ao sistema 🚀
      </Typography>
    </Box>
  );
}