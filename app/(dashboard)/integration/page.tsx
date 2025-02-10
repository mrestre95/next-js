import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import LinkIcon from "@mui/icons-material/Link";

export default async function IntegrationPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography marginBlock={2}>Ingrese los datos del vehiculo</Typography>

      <Box sx={{ flexGrow: 1, marginBlock: 3 }}>
        <Link
          href="https://auth.mercadolibre.com.uy/authorization?response_type=code&client_id=3844293861730465&redirect_uri=https://8911-190-133-94-152.ngrok-free.app/callback"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="contained" startIcon={<LinkIcon />}>
            Mercado Libre
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
