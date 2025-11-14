// utils/apiHelper.ts
import axios, { AxiosRequestConfig, AxiosError } from "axios";

// Set your backend base URL here
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/** Universal API Helper */
async function apiHelper<T = any>(config: AxiosRequestConfig): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
        // Prepend BASE_URL if not absolute URL
        if (!config.url?.startsWith("http")) {
            config.url = `${BASE_URL}${config.url}`;
        }

        const response = await axios(config);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        let message = "Unknown error occurred";

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                if (typeof axiosError.response.data === "object" && axiosError.response.data !== null) {
                    message = (axiosError.response.data as any).message || JSON.stringify(axiosError.response.data);
                } else {
                    message = axiosError.response.statusText || "Server error";
                }
            } else if (axiosError.request) {
                message = "No response from server. Please check your connection.";
            } else {
                message = axiosError.message;
            }
        } else if (error instanceof Error) {
            message = error.message;
        }

        return { success: false, error: message };
    }
}

/** GET request helper */
export const ApiGet = async <T = any>(url: string, headers: Record<string, string> = {}) =>
    apiHelper<T>({ url, method: "GET", headers });

/** POST JSON helper */
export const ApiPost = async <T = any>(url: string, data: any = {}, headers: Record<string, string> = {}) =>
    apiHelper<T>({
        url,
        method: "POST",
        data,
        headers: { "Content-Type": "application/json", ...headers },
    });

/** POST FormData helper */
export const ApiPostFormData = async <T = any>(url: string, formData: FormData, headers: Record<string, string> = {}) =>
    apiHelper<T>({
        url,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data", ...headers },
    });

/** PUT JSON helper */
export const ApiPut = async <T = any>(url: string, data: any = {}, headers: Record<string, string> = {}) =>
    apiHelper<T>({
        url,
        method: "PUT",
        data,
        headers: { "Content-Type": "application/json", ...headers },
    });

/** DELETE helper */
export const ApiDelete = async <T = any>(url: string, headers: Record<string, string> = {}) =>
    apiHelper<T>({ url, method: "DELETE", headers });
