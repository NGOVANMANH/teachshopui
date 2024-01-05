import { useState, useEffect } from "react";
import Context from "./Context";
import { toast, ToastContainer } from "react-toastify";

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

    const [total, setTotal] = useState(0);

    const [discount, setDiscount] = useState(0);

    const [fee, setFee] = useState(0);

    const [isCheckAll, setIsCheckAll] = useState(false);


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
                    const _cart = [...res.product_cart].map(item => ({
                        ...item,
                        check: false,
                    }));
                    setCart(_cart);
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
                check: false,
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
                    check: false,
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
        setFee(0);
        setDiscount(0);
    }

    const checkedProduct = (productID, productColor, value) => {
        const cartAfter = [...cart];
        const foundProduct = cartAfter.find(item => (item.id === productID && item.color === productColor));
        if (foundProduct) {
            foundProduct.check = value;
            setCart(cartAfter);
            if (user.auth === false) {
                localStorage.setItem("cart", JSON.stringify(cartAfter));
            }
        }
    }

    const checkedAllProducts = () => {
        const cartAfter = [...cart];
        cartAfter.forEach(item => {
            item.check = true;
        })
        setCart(cartAfter);
        setIsCheckAll(true);
    }

    const unCheckedAllProducts = () => {
        const cartAfter = [...cart];
        cartAfter.forEach(item => {
            item.check = false;
        })
        setCart(cartAfter);
        setIsCheckAll(false);
    }

    useEffect(() => {
        const _total = [...cart].reduce((total, item) => {
            if (item.check === false) return total;
            else return total + item.quantity * item.price;
        }, 0);
        setTotal(_total);
    }, [cart])

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Hàm xử lý khi trạng thái mạng thay đổi
        const handleNetworkChange = () => {
            setIsOnline(navigator.onLine);
        };

        // Thêm sự kiện lắng nghe sự thay đổi trạng thái mạng
        window.addEventListener('online', handleNetworkChange);
        window.addEventListener('offline', handleNetworkChange);

        // Loại bỏ sự kiện khi component unmount
        return () => {
            window.removeEventListener('online', handleNetworkChange);
            window.removeEventListener('offline', handleNetworkChange);
        };
    }, []);

    useEffect(() => {
        if (!isOnline) {
            toast.warn("Bạn đang Offline", {
                position: toast.POSITION.BOTTOM_LEFT
            })
        }
    }, [isOnline])

    return (
        <Context.Provider value={{ products, user, setUser, cart, addToCart, deleteCartItem, updateQuantity, emptyCart, isCheckAll, checkedProduct, checkedAllProducts, unCheckedAllProducts, address, total, fee, discount, setFee, setDiscount }}>
            <ToastContainer position="top-right" />
            {children}
        </Context.Provider>
    );
}

export default Provider;
