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
        const response = await axios.post(`/api/customer/signup.php`, userInfor);
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const checkToken = async (token) => {
    try {
        const respone = await axios.get('/api/customer/read.php', { headers: { Authorization: token } })
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const updateInfor = async (token, infor) => {
    try {
        const respone = await axios.put('/api/customer/update.php', infor, { headers: { Authorization: token } })
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const checkEmail = async (email) => {
    try {
        const respone = await axios.post('/api/customer/validate_email/send_validate_email.php', email)
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

