import axiosInstance from "../api/axiosInstance";
import { storeToken } from "../utils/token";

export const handleLogin = async (credentials, setCredentials, setError, navigate) => {
    setError("");
    try {
        const res = await axiosInstance.post("/api/auth/login", credentials)
        const { token } = res.data

        storeToken("authToken", token)
        navigate("/admin/dashboard")  
        setCredentials({
            email: "",
            password: "",
        });
    } catch (err) {
    setError("Authentication failed. Please try again.");
    console.error(err);
    } 
}