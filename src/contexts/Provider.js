import { useState } from "react";
import Context from "./Context";
import { useEffect } from "react";
import { getAllProduct } from '../services/productServices';
import { NOT_FOUND } from '../services/constants';

const Provider = ({ children }) => {

    const [products, setProducts] = useState([]);

    const [userStatus, setUserStatus] = useState({
        auth: false,
        jwt: '',
    });

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllProduct();
            if (response !== NOT_FOUND) {
                setProducts(response);
            }
        }

        fetchApi();
    }, []);

    return (
        <Context.Provider value={{ products, userStatus, setUserStatus }}>
            {children}
        </Context.Provider>
    );
}

export default Provider;
