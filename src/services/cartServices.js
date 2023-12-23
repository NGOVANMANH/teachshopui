import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";

export const getCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.get('/api/cart/read.php', { headers: { Authorization: token } });
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
            const response = await axios.put('/api/cart/add.php', {
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
            const response = await axios.put('/api/cart/update_quantity.php', {
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
            const response = await axios.delete('/api/cart/delete.php', {
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
            const response = await axios.delete('/api/cart/deleteAll.php', {
                headers: { Authorization: token }
            })
            return response.data;
        } catch (error) {
            return NOT_FOUND;
        }
    }
}