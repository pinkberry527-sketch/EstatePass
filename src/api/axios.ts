import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/token/refresh/",
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.access;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export async function refreshAccessToken(): Promise<string> {
  const response = await axios.post(
    "http://localhost:8000/api/auth/token/refresh/",
    {},
    {
      withCredentials: true,
    },
  );

  const newAccessToken = response.data.access;

  setAccessToken(newAccessToken);

  return newAccessToken;
}

export default api;