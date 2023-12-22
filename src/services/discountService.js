import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";

export const getShippingFee = async (code) => {
    try {
        const response = await axios.post(`/api/discount/validate.php`, {
            code,
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

