import axios from "./customizeAxios";
import { NOT_FOUND } from './constants';

export const getOrders = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.get("/api/orders/read.php", { headers: { Authorization: token } });
            return response.data;
        } catch (error) {
            return NOT_FOUND;
        }
    }
}

export const addOrder = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const response = await axios.put("/api/orders/order.php", {
            ...data,
        }, { headers: { Authorization: token } })
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}