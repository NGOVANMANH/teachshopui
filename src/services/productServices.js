import axios from "./customizeAxios";
import { NOT_FOUND } from "./constant";

export const getAllProduct = async () => {
    try {
        const response = await axios.get(``);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const getProductByCategory = async (category) => {
    try {
        const response = await axios.get(`/api/product/show_by_category_brand.php?categoryName=${category}`);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const getProductById = async (id) => {
    try {
        const response = await axios.get(``);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

export const getSearchedProduct = async (searchValue) => {
    try {
        const response = await axios.get(`/api/product/search.php?key=${searchValue}`);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return NOT_FOUND;
    }
}

