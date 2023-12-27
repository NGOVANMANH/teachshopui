import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";
import endPoints from "./endPoints";

const shippingEndPoints = endPoints.shipping;

export const getShippingFee = async (city, district, ward) => {
    try {
        const response = await axios.post(shippingEndPoints.getShippingFee, {
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

