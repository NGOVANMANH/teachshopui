import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";
import endPoints from "./endPoints";

const userEndPoints = endPoints.user;

export const login = async (userInfor) => {
    try {
        const response = await axios.post(userEndPoints.login, userInfor);
        if (response && response.data && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const signup = async (userInfor) => {
    try {
        const response = await axios.post(userEndPoints.signup, userInfor);
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const checkToken = async (token) => {
    try {
        const respone = await axios.get(userEndPoints.checkToken, { headers: { Authorization: token } })
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const updateInfor = async (token, infor) => {
    try {
        const respone = await axios.put(userEndPoints.updateInfor, infor, { headers: { Authorization: token } })
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const updatePassword = async (token, oldPass, newPass) => {
    try {
        const respone = await axios.put(userEndPoints.updatePassword, {
            old_password: oldPass,
            new_password: newPass
        }, { headers: { Authorization: token } })
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const checkEmail = async (email) => {
    try {
        const respone = await axios.post(userEndPoints.checkEmail, { email })
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const checkKeyEmail = async (key, email) => {
    try {
        const respone = await axios.post(userEndPoints.checkKeyEmail, { key, email })
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const resetPassword = async (email) => {
    try {
        const respone = await axios.post(userEndPoints.resetPassword, { email })
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const resetPasswordToken = async (password, token) => {
    try {
        const response = await axios.post('/api/customer/reset_password/reset_password.php', {
            password,
            token,
        });
        return response.data;
    } catch (error) {
        return NOT_FOUND;
    }
}