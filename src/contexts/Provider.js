import { useState, useEffect } from "react";
import Context from "./Context";

import { getAllProduct } from '../services/productServices';
import getAddress from '../services/addressServices';
import { NOT_FOUND, SUCCESS_RESPONSE } from '../services/constants';
import { checkToken } from "../services/userServices";
import { getCart } from '../services/cartServices'

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

    useEffect(() => {
        if (user.auth === false) {
            if (!localStorage.getItem("cart")) {
                localStorage.setItem("cart", JSON.stringify([]));
            }
            const cartJson = JSON.parse(localStorage.getItem("cart"));

            setCart([
                ...cartJson,
            ])
        }
        else {
            // fetchCart
            const fetchCart = async () => {
                const res = await getCart();
                if (res && res.product_cart && res.product_cart.length > 0) {
                    setCart([
                        ...res.product_cart,
                    ]);
                }
                else {
                    setCart([]);
                }
            }

            fetchCart();
        }
    }, [user])

    useEffect(() => {
        if (user.auth === false) {
            if (cart.length > 0) {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
        else {
            // fetchApi
        }
    }, [cart, user])

    const addToCart = (product) => {
        console.log(product)
        if (user.auth === false) {
            const cartJson = JSON.parse(localStorage.getItem("cart"));
            cartJson.push({
                ...product,
                quantity: 1,
            });
            console.log(">>> Check cartJson: ", cartJson);
            setCart([
                ...cartJson,
            ])
            localStorage.setItem("cart", JSON.stringify(cartJson));
        }
        else {
            // fetchAPI
            const cartPrev = [...cart];
            cartPrev.push({
                ...product,
                quantity: 1,
            })
            setCart(cartPrev);
        }
    }

    return (
        <Context.Provider value={{ products, user, setUser, cart, setCart, addToCart, address }}>
            {children}
        </Context.Provider>
    );
}

export default Provider;
