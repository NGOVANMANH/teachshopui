import axios from "axios";
import { NOT_FOUND } from './constants'

const getAddress = async () => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/?depth=3`);
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export default getAddress;