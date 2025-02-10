"use client"; // Esto asegura que el componente se renderiza en el cliente

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

async function getAccessToken(code: string) {
  const response = await axios.post(
    "https://api.mercadolibre.com/oauth/token",
    {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.MELI_REDIRECT_URI,
      client_id: process.env.MELI_CLIENT_ID,
      client_secret: process.env.MELI_CLIENT_SECRET,
      code_verifier: process.env.MELI_CODE_VERIFIER,
    }
  );

  return response.data.access_token;
}

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el 'code' de los searchParams
    const code = searchParams.get("code");
    console.log("code", code);
    if (code) {
      // Intercambia el 'code' por un 'access_token'
      getAccessToken(code)
        .then((token) => {
          setAccessToken(token);
        })
        .catch((error) => {
          console.error("Error al obtener el token:", error);
        });
    }
  }, [searchParams]); // Solo se ejecuta cuando searchParams cambia

  if (accessToken) {
    return <div>Token obtenido: {accessToken}</div>;
  }

  return <div>Esperando autenticación...</div>;
}
