import { redirect } from "next/navigation";
import axios from "axios";

async function getAccessToken(code: string) {
  // Haces la solicitud para intercambiar el 'code' por un 'access_token'
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

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const { code } = searchParams;
  console.log("code", code);

  // Verifica que el parámetro 'code' exista en la URL
  if (!code) {
    // Si no hay 'code', redirige a una página de error
    return redirect("/error"); // Redirigir al usuario a una página de error si no se pasó el 'code'
  }

  try {
    // Intercambia el 'code' por un 'access_token'
    const accessToken = await getAccessToken(code);

    // Almacenar el access token en una cookie (opcional, aquí se muestra como ejemplo)
    // Si prefieres usar cookies, puedes hacerlo así:
    const cookieOptions = {
      httpOnly: true,
      path: "/",
      maxAge: 3600, // 1 hora
    };
    const cookie = `meli_access_token=${accessToken}; ${cookieOptions}`;

    // Setea la cookie en la respuesta (esto es en el contexto de Server Component)
    // Dependiendo de tu entorno, podrías usar una librería como 'cookies' para hacer esto más fácilmente
    // context.res.setHeader('Set-Cookie', cookie);

    // Redirige al usuario después de obtener el token
    return redirect("/dashboard"); // Redirigir al usuario al dashboard o página principal
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return redirect("/error"); // Si algo sale mal, redirigir a una página de error
  }
}
