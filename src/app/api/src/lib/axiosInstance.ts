import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Endereço do seu backend
  timeout: 10000, // Tempo de espera para a requisição
});

export default axiosInstance;