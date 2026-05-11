import { useState } from "react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { GlobalAlert } from "../shared/components/feedback/GlobalAlert";
import { GlobalDialog } from "../shared/components/feedback/GlobalDialog";

import { useDispatch } from "react-redux";
import { showAlert } from "../store/alertSlice";
import { openDialog } from "../store/dialogSlice";

import { useAuth } from "../features/auth/hooks/useAuth";

export function MainLayout() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { logout, user } = useAuth();

  function handleNavigate(path: string) {
    navigate(path);
    setLeftOpen(false); // fecha o menu ao clicar
  }

  function handleLogout() {
    logout();

    navigate("/login");

    setLeftOpen(false);
  }

  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Items",
      path: "/items",
      icon: <ListIcon />,
    },
  ];

  return (
    <Box>
      {/* HEADER */}
      <Header
        onLeftClick={() => setLeftOpen(true)}
        onRightClick={() => setRightOpen(true)}
      />

      {/* Espaço do header */}
      <Toolbar />

      {/* CONTEÚDO */}
      <Box sx={{ p: 2 }}><Outlet /></Box>

      <Footer />

      {/* SIDEBAR ESQUERDA */}
      <Drawer
        anchor="left"
        open={leftOpen}
        onClose={() => setLeftOpen(false)}
      >
        <Box
          sx={{
            width: 250,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header do menu */}
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Menu</Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {user?.name}
            </Typography>
          </Box>

          {/* Área rolável */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <List>
              {menuItems.map((item) => {
                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                return (
                  <ListItemButton
                    key={item.path}
                    selected={isActive}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>

          <Divider />

          <List>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>

              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* SIDEBAR DIREITA */}
      <Drawer
        anchor="right"
        open={rightOpen}
        onClose={() => setRightOpen(false)}
      >
        <Box
          sx={{
            width: 250,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Utilitários</Typography>
          </Box>

          {/* Área rolável */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <List>

              {/* ALERTS */}
              <ListItemButton
                onClick={() => {
                  dispatch(
                    showAlert({
                      message: "Alerta de informação",
                      type: "info",
                    })
                  );
                  setRightOpen(false);
                }}
              >
                <ListItemText primary="Alert Info" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  dispatch(
                    showAlert({
                      message: "Alerta de aviso",
                      type: "warning",
                    })
                  );
                  setRightOpen(false);
                }}
              >
                <ListItemText primary="Alert Warning" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  dispatch(
                    showAlert({
                      message: "Erro inesperado",
                      type: "error",
                    })
                  );
                  setRightOpen(false);
                }}
              >
                <ListItemText primary="Alert Error" />
              </ListItemButton>

              {/* DIALOG PADRÃO */}
              <ListItemButton
                onClick={() => {
                  dispatch(
                    openDialog({
                      title: "Confirmação",
                      message: "Deseja continuar?",
                      onConfirm: () => {
                        console.log("Confirmado");
                      },
                      onCancel: () => {
                        console.log("Cancelado");
                      },
                    })
                  );
                  setRightOpen(false);
                }}
              >
                <ListItemText primary="Dialog Confirmação" />
              </ListItemButton>

              {/* DIALOG CUSTOM (simulando popup de tela) */}
              <ListItemButton
                onClick={() => {
                  dispatch(
                    openDialog({
                      title: "Popup de Listagem",
                      message: "Aqui viria um componente mais complexo",
                    })
                  );
                  setRightOpen(false);
                }}
              >
                <ListItemText primary="Dialog Custom" />
              </ListItemButton>

            </List>
          </Box>
        </Box>
      </Drawer>

      <GlobalAlert />
      <GlobalDialog />
    </Box>
  );
}