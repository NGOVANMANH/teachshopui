import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";
import endPoints from "./endPoints";

const discountEndpoints = endPoints.discount;

export const getDiscount = async (code, total) => {
    try {
        const response = await axios.post(discountEndpoints.getDiscount, {
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

