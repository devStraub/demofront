import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { showAlert } from "../../../store/alertSlice";

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
} from "@mui/material";

import {
  requestOtp,
  validateOtp,
} from "../services/authService";

import { getApiErrorMessage } from "../../../shared/utils/apiError";

export const LoginPage = () => {
  const {signIn,signInWithToken} = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (useOtp) {

      try {

        // ETAPA 1
        if (!otpSent) {

          await requestOtp(email);

          dispatch(
            showAlert({
              message:
                "Código enviado para o email",
              type: "success",
            })
          );

          setOtpSent(true);

          return;
        }

        // ETAPA 2
        const data =
          await validateOtp(
            email,
            otpCode
          );

        signInWithToken(data);

        navigate("/");

      } catch (error) {

        dispatch(
          showAlert({
            message:
              getApiErrorMessage(error),
            type: "error",
          })
        );
      }

      return;
    }

    try {
      await signIn(email, password);

      navigate("/");
    } catch (error) {
      dispatch(
        showAlert({
          message: "Usuário ou senha inválidos",
          type: "error",
        })
      );
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google");
  };

  return (
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
        {useOtp ? "Entrar com código" : "Login"}
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

        {useOtp && otpSent && (

          <TextField
            fullWidth
            variant="standard"
            label="Código OTP"
            value={otpCode}
            onChange={(e) =>
              setOtpCode(e.target.value)
            }
            margin="normal"
          />
        )}

        {!useOtp && (
          <TextField
            fullWidth
            variant="standard"
            type="password"
            label="Senha"
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
            background:
              "linear-gradient(90deg, #4facfe, #8e44ad)",
            "&:hover": {
              background:
                "linear-gradient(90deg, #3a8dde, #732d91)",
            },
          }}
        >
          {useOtp
            ? otpSent
              ? "Entrar"
              : "Enviar código"
            : "Login"}
        </Button>
      </Box>

      {/* DIVIDER */}
      <Divider>ou</Divider>

      {/* GOOGLE */}
      <Button
        fullWidth
        variant="outlined"
        onClick={handleGoogleLogin}
        sx={{
          textTransform: "none",
        }}
      >
        Entrar com Google
      </Button>

      {/* LINKS */}
      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        gap={1}
      >
        {!useOtp ? (
          <Typography variant="body2">
            <Link
              component="button"
              onClick={() => setUseOtp(true)}
              underline="hover"
            >
              Entrar com código de acesso
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2">
            <Link
              component="button"
              onClick={() => setUseOtp(false)}
              underline="hover"
            >
              Voltar para login com senha
            </Link>
          </Typography>
        )}

        {/* REGISTRO */}
        <Typography variant="body2">
          Não possui conta?{" "}

          <Link
            component="button"
            underline="hover"
            onClick={() => navigate("/register")}
          >
            Criar conta
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};