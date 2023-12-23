import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";

export const getDiscount = async (code, total) => {
    try {
        const response = await axios.post(`/api/discount/validate.php`, {
            code,
            total_price: total,
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

