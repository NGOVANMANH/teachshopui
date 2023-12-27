import axios from "./customizeAxios";
import { NOT_FOUND } from './constants';
import endPoints from "./endPoints";

const orderEndpoints = endPoints.order;

export const getOrders = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.get(orderEndpoints.getOrders, { headers: { Authorization: token } });
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
        const response = await axios.put(orderEndpoints.addOrder, {
            ...data,
        }, { headers: { Authorization: token } })
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}