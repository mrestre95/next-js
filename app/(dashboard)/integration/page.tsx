import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import LinkIcon from "@mui/icons-material/Link";

export default async function IntegrationPage() {
  const redirectUri =
    process.env.NEXT_PUBLIC_MELI_REDIRECT_URI || "/default-url";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography marginBlock={2}>
        Seleccione el proveedor con el que desea integrarse
      </Typography>

      <Box sx={{ flexGrow: 1, marginBlock: 3 }}>
        <Link href={redirectUri} target="_blank" rel="noopener noreferrer">
          <Button variant="contained" startIcon={<LinkIcon />}>
            Mercado Libre
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
