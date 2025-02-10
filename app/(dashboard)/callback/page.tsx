"use client"; // Esto asegura que el componente se renderiza en el cliente

import getAccessToken from "@/app/api/services/oauth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
