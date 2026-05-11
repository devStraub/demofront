import { Typography } from "@mui/material";

import { PageContainer } from "../../../shared/components/layout/PageContainer";

export const HomePage = () => {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="Bem-vindo ao sistema"
    >
      <Typography>
        Conteúdo da página inicial
      </Typography>
    </PageContainer>
  );
};