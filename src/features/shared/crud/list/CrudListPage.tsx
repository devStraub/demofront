import { Box, Typography, Button } from "@mui/material";
import { useList } from "./useList";
import { useNavigate } from "react-router-dom";

export function ListPage() {
  const { data, loading } = useList();
  const navigate = useNavigate();

  return (
    <Box>
        <Typography variant="h5">Listagem</Typography>

        <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => navigate("/items/new")}
        >
            Novo
        </Button>

        <Box sx={{ mt: 2 }}>
            {loading ? "Carregando..." : JSON.stringify(data)}
        </Box>
    </Box>
  );
}