import { useState } from "react";
import Context from "./Context";
import { useEffect } from "react";
import { getAllProduct } from '../services/productServices';
import getAddress from '../services/addressServices';
import { NOT_FOUND, SUCCESS_RESPONSE } from '../services/constants';
import { checkToken } from "../services/userServices";

const Provider = ({ children }) => {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    const [user, setUser] = useState({
        auth: false,
        userInfor: {

        }
    });

    const [address, setAddress] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllProduct();
            if (response !== NOT_FOUND) {
                setProducts(response);
            }
        }

        fetchApi();
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const fetchApi = async () => {
                const respone = await checkToken(token);
                if (respone === NOT_FOUND) {
                    localStorage.removeItem("token");
                }
                else {
                    if (respone.status === SUCCESS_RESPONSE) {
                        setUser((prevUser) => {
                            return {
                                ...prevUser,
                                auth: true,
                                userInfor: respone.data,
                            }
                        })
                    }
                }
            }

            fetchApi();
        }
    }, [])

    useEffect(() => {

        const fetchApi = async () => {
            const respone = await getAddress();
            if (respone && respone.length && respone !== 404) {
                setAddress(respone);
            }
        }

        fetchApi();
    }, [])

    return (
        <Context.Provider value={{ products, user, setUser, cart, setCart, address }}>
            {children}
        </Context.Provider>
    );
}

export default Provider;
