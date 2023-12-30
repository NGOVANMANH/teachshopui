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

export const cancelOrder = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Người dùng hết hạn vui lòng đăng nhập lại!")
        return;
    }
    try {
        const response = await axios.put(orderEndpoints.cancelOrder, {
            id,
        }, { headers: { Authorization: token } })
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}


export const getOrdersGuest = async () => {
    try {
        const response = await axios.get(orderEndpoints.getOrdersGuest, {
            id: 0,
            name: "string",
            phone: "string"
        });
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}


export const addOrderGuest = async (data) => {
    try {
        const response = await axios.put(orderEndpoints.addOrderGuest, {
            ...data,
        });
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}

export const cancelOrderGuest = async (orderID) => {
    try {
        const response = await axios.put(orderEndpoints.cancelOrderGuest, {
            id: orderID,
        });
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}