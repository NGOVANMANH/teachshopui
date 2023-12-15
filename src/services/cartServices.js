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