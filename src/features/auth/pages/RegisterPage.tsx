import { useState } from "react";

import {
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Link,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../../store/alertSlice";
import { useAuth } from "../hooks/useAuth";
import { getApiErrorMessage } from "../../../shared/utils/apiError";

export const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signInWithToken } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            dispatch(
                showAlert({
                    message: "As senhas não coincidem",
                    type: "warning",
                })
            );
            return;
        }

        try {

            const data = await register(
                name,
                email,
                password
            );

            signInWithToken(data);

            dispatch(
                showAlert({
                    message: "Conta criada com sucesso",
                    type: "success",
                })
            );

            navigate("/");

        } catch (error: any) {
            dispatch(
                showAlert({
                    message: getApiErrorMessage(error),
                    type: "error",
                })
            );
        }
    };

    return (
        <Paper
            elevation={6}
            sx={{
                width: "100%",
                maxWidth: 380,
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
            }}
        >
            <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
            >
                Criar conta
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
            >

                <TextField
                    fullWidth
                    margin="normal"
                    variant="standard"
                    label="Nome"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <TextField
                    fullWidth
                    margin="normal"
                    variant="standard"
                    label="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <TextField
                    fullWidth
                    margin="normal"
                    variant="standard"
                    type="password"
                    label="Senha"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <TextField
                    fullWidth
                    margin="normal"
                    variant="standard"
                    type="password"
                    label="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                />

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
                    }}
                >
                    Criar conta
                </Button>
            </Box>

            <Box
                textAlign="center"
                mt={2}
            >
                <Typography variant="body2">
                    Já possui conta?{" "}

                    <Link
                        component="button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </Link>
                </Typography>
            </Box>
        </Paper>
    );
};