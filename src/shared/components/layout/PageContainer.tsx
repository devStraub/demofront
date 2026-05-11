import { ReactNode } from "react";

import {
  Box,
  Typography,
  Divider,
} from "@mui/material";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const PageContainer = ({
  title,
  subtitle,
  actions,
  children,
}: PageContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box>
            {actions}
          </Box>
        )}
      </Box>

      <Divider />

      {/* CONTENT */}
      <Box>
        {children}
      </Box>
    </Box>
  );
};