import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AppsIcon from "@mui/icons-material/Apps";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {
  onLeftClick?: () => void;
  onRightClick?: () => void;
};

export function Header({ onLeftClick, onRightClick }: Props) {
  const { logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login");
  }

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
        <Box
          sx={{
            minWidth: 96,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          {/* UTILITÁRIOS */}
          <IconButton
            color="inherit"
            onClick={onRightClick}
          >
            <AppsIcon />
          </IconButton>

          {/* LOGOUT */}
          <IconButton
            color="inherit"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}