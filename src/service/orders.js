import axiosInstance from "../api/axiosInstance";


export const getAllOrders = async (setOrders, setIsLoading) => {
    setIsLoading(true);
    try {
        const res = await axiosInstance.get("/api/orders");
        setOrders(res.data);
    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        setIsLoading(false);
    }
}

export const placeOrder = async (orderData, setIsLoading, setError) => {
    setIsLoading(true);
    try {
        const res = await axiosInstance.post("/api/orders/place", orderData);
        return res.data;
    } catch (error) {
        console.error('Error placing order:', error);
        setError(error || "Something went wrong. Please try again or contact us directly.");
    } finally {
        setIsLoading(false);
    }
}

export const getOrderInfo = async (orderId, setOrder, setIsLoading, setError) => {
    setIsLoading(true);
    try {
        const res = await axiosInstance.get(`/api/orders/${orderId}`);
        if (res.status === 404) {
            setError("Order not found");
            return;
        }
        if (res.status !== 200) {
            throw new Error("Failed to fetch order info");
        }
        const data = res.data;
        setOrder(data);
    } catch (error) {
        console.error('Error fetching order info:', error);
        setError(error || "Something went wrong. Please try again or contact us directly.");
    } finally {
        setIsLoading(false);
    }
}

export const updateOrderStatus = async (orderId, status, setIsLoading, setError) => {
    setIsLoading(true);
    try {
        const res = await axiosInstance.post(`/api/orders/update-status`, { orderId, status });
        if (res.status === 404) {
            setError("Order not found");
            return;
        }
        if (res.status !== 200) {
            throw new Error("Failed to update order status");
        }
        return res.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        setError(error || "Something went wrong. Please try again or contact us directly.");
    } finally {
        setIsLoading(false);
    }
}