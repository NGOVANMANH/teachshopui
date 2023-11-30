import axios from "./customizeAxios";

const ERROR_CODE = 404;

export const getAllProduct = async () => {
    try {
        const response = await axios.get(``);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return ERROR_CODE;
    }
}

export const getProductByCategory = async (category) => {
    try {
        const response = await axios.get(`/api/product/show_by_category_brand.php?categoryName=${category}`);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return ERROR_CODE;
    }
}

export const getProductById = async (id) => {
    try {
        const response = await axios.get(``);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return ERROR_CODE;
    }
}

export const getSearchedProduct = async (searchValue) => {
    try {
        const response = await axios.get(`/api/product/search.php?key=${searchValue}`);
        if (response && response.data && response.data.product) {
            return response.data.product;
        }
    } catch (error) {
        return ERROR_CODE;
    }
}

