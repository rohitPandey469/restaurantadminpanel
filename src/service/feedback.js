import axiosInstance from "../api/axiosInstance";

export const getAllFeedback = async (setFeedback, setIsLoading, setError) => {
    try {
        setIsLoading(true);
        const res = await axiosInstance.get("/api/feedback");
        const data = res.data;
        setFeedback(data);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        setError("Failed to fetch feedback. Please try again later.");
    } finally {
        setIsLoading(false);
    }
}

export const createFeedback = async (feedbackData) => {
    try {
        const res = await axiosInstance.post("/api/feedback", feedbackData);
        const data = res.data;
        return data;
    } catch (error) {
        console.error("Error creating feedback:", error);
    }
}