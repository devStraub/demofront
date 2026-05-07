import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
} from "@mui/material";

export const LoginPage = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useOtp, setUseOtp] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (useOtp) {
      console.log("Enviar OTP para:", email);
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Erro ao logar");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4facfe, #8e44ad)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 380,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" fontWeight="bold">
          {useOtp ? "Login com código" : "Login"}
        </Typography>

        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="standard"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          {!useOtp && (
            <TextField
              fullWidth
              variant="standard"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
          )}

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              color: "#fff",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #4facfe, #8e44ad)",
              "&:hover": {
                background: "linear-gradient(90deg, #3a8dde, #732d91)",
              },
            }}
          >
            {useOtp ? "Enviar código" : "Login"}
          </Button>
        </Box>

        {/* DIVIDER */}
        <Divider>ou</Divider>

        {/* GOOGLE LOGIN */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          sx={{ textTransform: "none" }}
        >
          Entrar com Google
        </Button>

        {/* LINKS */}
        <Box textAlign="center">
          {!useOtp ? (
            <>
              <Typography variant="body2">
                <Link href="#" onClick={() => setUseOtp(true)}>
                    Entrar com código de acesso
                </Link>
              </Typography>
            </>
          ) : (
            <Typography variant="body2">
              <Link href="#" onClick={() => setUseOtp(false)}>
                Voltar para login com senha
              </Link>
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};