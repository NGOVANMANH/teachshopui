import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";

export const login = async (userInfor) => {
    try {
        const response = await axios.post(`/api/customer/login.php`, userInfor);
        if (response && response.data && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const signup = async (userInfor) => {
    try {
        const response = await axios.get(``);
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

