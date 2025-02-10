import axios from "axios";

export default async function getAccessToken(code: string) {
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
