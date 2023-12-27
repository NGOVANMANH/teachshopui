import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";
import endPoints from "./endPoints";

const cartEndPoints = endPoints.cart;

export const getCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.get(`${cartEndPoints.getCart}`, { headers: { Authorization: token } });
            return response.data;
        } catch (error) {
            return NOT_FOUND;
        }
    }
}

export const addCart = async (product) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.put(`${cartEndPoints.addCart}`, {
                product_id: product.id,
                color: product.color,
                quantity: product.quantity,
            }, { headers: { Authorization: token } });
            return response.data;
        } catch (error) {
            return NOT_FOUND;
        }
    }
}

export const updateProductQuantity = async (product) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.put(`${cartEndPoints.updateQuantity}`, {
                product_id: product.id,
                color: product.color,
                quantity: product.quantity,
            }, { headers: { Authorization: token } });
            return response.data;
        } catch (error) {
            return NOT_FOUND;
        }
    }
}

export const deleteProduct = async (product) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.delete(cartEndPoints.deleteProduct, {
                data: {
                    product_id: product.id,
                    color: product.color,
                },
                headers: { Authorization: token }
            })
            return response.data;
        } catch (error) {
            return NOT_FOUND;
        }
    }
}

export const deleteCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.delete(cartEndPoints.deleteCart, {
                headers: { Authorization: token }
            })
            return response.data;
        } catch (error) {
            return NOT_FOUND;
        }
    }
}