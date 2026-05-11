import { Box, TextField, Button, Typography } from "@mui/material";
import { useEdit } from "./useEdit";

export function EditPage() {
  const { form, handleChange, handleSubmit } = useEdit();

  return (
    <Box>
      <Typography variant="h5">Edição</Typography>

      <TextField
        label="Nome"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Salvar
      </Button>
    </Box>
  );
}