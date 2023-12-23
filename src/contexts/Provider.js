import { useState, useEffect } from "react";
import Context from "./Context";

import { getAllProduct } from '../services/productServices';
import getAddress from '../services/addressServices';
import { NOT_FOUND, SUCCESS_RESPONSE } from '../services/constants';
import { checkToken } from "../services/userServices";
import { getCart, addCart, updateProductQuantity, deleteProduct, deleteCart } from '../services/cartServices'

const Provider = ({ children }) => {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    const [user, setUser] = useState({
        auth: false,
        userInfor: {

        }
    });

    const [address, setAddress] = useState([]);

    // Fetch Products
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAllProduct();
            if (response !== NOT_FOUND) {
                setProducts(response);
            }
        }

        fetchApi();
    }, []);

    // Check user token
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

    // get api province
    useEffect(() => {
        const fetchApi = async () => {
            const respone = await getAddress();
            if (respone && respone.length && respone !== 404) {
                setAddress(respone);
            }
        }

        fetchApi();
    }, [])

    // khi user thay đổi => giỏ hàng ứng với từng user
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

    const addToCart = (product) => {
        const cartPrev = [...cart];
        const existingProduct = cartPrev.find(item => (item.id === product.id && item.color === product.color));
        if (existingProduct) {
            existingProduct.quantity++;
        }
        else {
            cartPrev.push({
                ...product,
                quantity: 1,
            })
        }
        setCart(cartPrev);
        if (user.auth === false) {
            localStorage.setItem("cart", JSON.stringify(cartPrev));
        }
        else {
            if (existingProduct) {
                updateQuantity(product.id, product.color, 1)
            }
            else {
                addCart({
                    ...product,
                    quantity: 1,
                })
            }
        }
    }

    const deleteCartItem = (productID, productColor) => {
        const cartAfter = cart.filter(item => !(item.id === productID && item.color === productColor));
        setCart(cartAfter);
        if (user.auth === false) {
            localStorage.setItem("cart", JSON.stringify(cartAfter));
        }
        else {
            deleteProduct({
                id: productID,
                color: productColor,
            })
        }
    }

    const updateQuantity = (productID, productColor, value) => {
        const cartAfter = [...cart];
        const foundProduct = cartAfter.find(item => (item.id === productID && item.color === productColor));
        if (foundProduct) {
            foundProduct.quantity += value;
            if (foundProduct.quantity <= 0) {
                deleteCartItem(productID, productColor);
            }
            else {
                setCart(cartAfter);
                if (user.auth === false) {
                    localStorage.setItem("cart", JSON.stringify(cartAfter));
                }
                else {
                    updateProductQuantity({
                        id: productID,
                        color: productColor,
                        quantity: foundProduct.quantity,
                    })
                }
            }
        }
    }

    const emptyCart = () => {
        const cartAfter = [];
        if (user.auth === false) {
            localStorage.setItem("cart", JSON.stringify(cartAfter));
        }
        else {
            deleteCart();
        }
        setCart(cartAfter);
    }

    return (
        <Context.Provider value={{ products, user, setUser, cart, addToCart, deleteCartItem, updateQuantity, emptyCart, address }}>
            {children}
        </Context.Provider>
    );
}

export default Provider;
