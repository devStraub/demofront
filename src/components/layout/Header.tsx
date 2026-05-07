import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  onLeftClick?: () => void;
  onRightClick?: () => void;
};

export function Header({ onLeftClick, onRightClick }: Props) {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Esquerda */}
        <Box sx={{ minWidth: 48 }}>
          <IconButton color="inherit" onClick={onLeftClick}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Centro */}
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h6">Logo</Typography>
        </Box>

        {/* Direita */}
        <Box sx={{ minWidth: 48, display: "flex", justifyContent: "flex-end" }}>
          <IconButton color="inherit" onClick={onRightClick}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}