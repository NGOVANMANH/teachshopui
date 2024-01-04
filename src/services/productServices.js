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

// sort
export const getSortProps = async (category, prop) => {
    switch (category) {
        case 'phone':
            try {
                const response = await axios.get(`${productEndPoints.getSortProps.phone}?prop=${prop}`);
                return response.data;
            } catch (error) {
                return NOT_FOUND;
            }
        case 'cable':
            try {
                const response = await axios.get(`${productEndPoints.getSortProps.cable}?prop=${prop}`);
                return response.data;
            } catch (error) {
                return NOT_FOUND;
            }
        case 'backupcharger':
            try {
                const response = await axios.get(`${productEndPoints.getSortProps.backupcharger}?prop=${prop}`);
                return response.data;
            } catch (error) {
                return NOT_FOUND;
            }
        case 'adapter':
            try {
                const response = await axios.get(`${productEndPoints.getSortProps.adapter}?prop=${prop}`);
                return response.data;
            } catch (error) {
                return NOT_FOUND;
            }
        default: break;
    }
}

export const getSortProducts = async (category, data) => {
    switch (category) {
        case 'phone':
            try {
                const response = await axios.post(productEndPoints.getSortProducts.phone, {
                    brand: data.brand,
                    os: data.os,
                    price: data.price,
                    ram: data.ram,
                    rom: data.rom,
                    charger: data.charger
                });
                return response.data;
            } catch (error) {
                return NOT_FOUND;
            }
        case 'cable':
            try {
                const response = await axios.post(productEndPoints.getSortProducts.cable, {
                    brand: data.brand,
                    price: data.price,
                    input: data.input,
                    output: data.output,
                    length: data.length,
                    charger: data.charger
                });
                return response.data;
            } catch (error) {
                return NOT_FOUND;
            }
        case 'backupcharger':
            try {
                const response = await axios.post(productEndPoints.getSortProducts.backupcharger, {
                    brand: data.brand,
                    price: data.price,
                    capacity: data.capacity,
                    input: data.input,
                    output: data.output,
                    charger: data.charger,
                });
                return response.data;
            } catch (error) {
                return NOT_FOUND;
            }
        case 'adapter':
            try {
                const response = await axios.post(productEndPoints.getSortProducts.adapter, {
                    brand: data.brand,
                    price: data.price,
                    numberport: data.numberport,
                    output: data.output,
                    charger: data.charger
                });
                return response.data;
            } catch (error) {
                return NOT_FOUND;
            }
        default: break;
    }
}
