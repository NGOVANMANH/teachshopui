import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";

export const getShippingFee = async (city, district, ward) => {
    try {
        const response = await axios.post(`/api/orders/shipping_fee.php`, {
            province_name: city,
            district_name: district,
            ward_name: ward
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

