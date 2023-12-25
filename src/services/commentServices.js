import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";

export const getComments = async (productId) => {
    try {
        const response = await axios.get(`/api/review/read.php?product_id=${productId}`);
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}

export const addComment = async (productId, content, rating) => {
    const token = localStorage.getItem("token")
    if (!token) {
        alert("Vui lòng đăng nhập");
        return NOT_FOUND;
    }
    try {
        const response = await axios.post(`api/review/add.php`, {
            productId: productId,
            rating: rating,
            content: content,
        }, { headers: { Authorization: token } });
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}
