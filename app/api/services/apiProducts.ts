import axios from "axios";

const apiProducts = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const searchCar = async (query: string) => {
  const formattedQuery = encodeURIComponent(query.trim());
  try {
    const response = await apiProducts.get(
      `/sites/MLU/search?q=${formattedQuery}&category=MLA1744`
    );
    console.log("response", response.data);
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Aquí TypeScript sabe que 'error' es un AxiosError
      throw new Error(
        error.response?.data || `code:${error.code} message:${error.message}`
      );
    } else {
      // Si el error no es un AxiosError, maneja el caso genérico
      throw new Error("An unexpected error occurred");
    }
  }
};
