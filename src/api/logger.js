import { axiosInstance } from "./axios-instance";

export const firstEnterLog = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") return;
    axiosInstance.post("/api/v1/statistics-logs", { url: window.location.href });
};

export const openLoginLog = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") return;
    axiosInstance.post("/api/v1/statistics-logs", {
        action: "login-form-opened"
    });
};
