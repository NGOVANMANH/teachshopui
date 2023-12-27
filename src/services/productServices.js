import axios from "./customizeAxios";
import { NOT_FOUND } from "./constants";
import endPoints from "./endPoints";

const productEndPoints = endPoints.product;

export const getAllProduct = async () => {
    try {
        const response = await axios.get(productEndPoints.getAllProduct);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const getProductByCategory = async (category) => {
    try {
        const response = await axios.get(`${productEndPoints.getProductByCategory}?categoryName=${category}`);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const getProductById = async (id) => {
    try {
        const response = await axios.get(productEndPoints.getProductById);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const getSearchedProduct = async (searchValue) => {
    try {
        const response = await axios.get(`${productEndPoints.getSearchedProduct}?key=${searchValue}`);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}


export const getProductParameters = async (id) => {
    try {
        const respone = await axios.get(`${productEndPoints.getProductParameters}?id=${id}`)
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const getProductColors = async (id) => {
    try {
        const respone = await axios.get(`${productEndPoints.getProductColors}?id=${id}`);
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}

export const getColorsAndImages = async (id) => {
    try {
        const respone = await axios.get(`${productEndPoints.getColorsAndImages}?productid=${id}`);
        return respone.data;
    }
    catch (error) {
        return NOT_FOUND;
    }
}