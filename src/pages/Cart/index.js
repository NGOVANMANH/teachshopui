import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaMapMarkedAlt, FaCreditCard } from "react-icons/fa";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";

import { CartItem, HorizontalLine } from "../../components";
import styles from './Cart.module.scss';
import { useContextData, useDebounce } from "../../hooks";
import { getShippingFee } from '../../services/shippingServices'
import { getDiscount } from "../../services/discountService";
import { addOrder, addOrderGuest } from "../../services/orderServices";
import { NOT_FOUND, SUCCESS_RESPONSE } from "../../services/constants";

const Cart = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Cart - Techshop";
    }, [])

    const { cart, address, user, emptyCart, setFee, setDiscount } = useContextData();

    const [cartItems, setCartItems] = useState([]);

    const [province, setProvince] = useState([]);

    const [shippingFee, setShippingFee] = useState(0);

    const [gettingFee, setGettingFee] = useState(false);
    const [isGetFeeSuccess, setIsGetFeeSuccess] = useState(true);
    const [isGettedFee, setIsGettedFee] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0);
    const [isOrdering, setIsOrdering] = useState(false);


    useEffect(() => {
        if (cart) {
            setCartItems([...cart]);
        }
    }, [cart])

    useEffect(() => {
        if (address) {
            setProvince([...address]);
        }
    }, [address])

    const formik = useFormik({
        initialValues: {
            name: user.auth ? user.userInfor.name : '',
            email: user.auth ? user.userInfor.email : '',
            phoneNumber: user.auth ? user.userInfor.phone : '',
            district: user.auth ? user.userInfor.district : '',
            city: user.auth ? user.userInfor.city : '',
            ward: user.auth ? user.userInfor.ward : '',
            address: user.auth ? user.userInfor.address : '',
            note: '',
            paymentMethod: '',
        },
        onSubmit: values => {
            handleOrder(values);
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Quá ngắn!').max(50, 'Quá dài!').required('Vui lòng nhập tên!'),
            email: Yup.string().email('Email không đúng định dạng!').required('Vui lòng nhập email!'),
            phoneNumber: Yup.string().min(10, 'Số điện thoại không hợp lệ!').max(12, 'Số điện thoại không hợp lệ!').required('Vui lòng nhập số điện thoại!'),
            district: Yup.string().required('Vui lòng chọn Quận huyện!'),
            city: Yup.string().required('Vui lòng chọn Thành phố!'),
            ward: Yup.string().required('Vui lòng chọn Xã, Phường!'),
            address: Yup.string().required('Vui lòng nhập địa chỉ!'),
            paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán!'),
        })
    });

    useEffect(() => {
        const city = formik.values.city;
        const district = formik.values.district;
        const ward = formik.values.ward;

        if (city.length > 0 && ward.length > 0 && district.length > 0 && !isGettedFee) {
            const fetchShippingFee = async () => {
                setGettingFee(true);
                const response = await getShippingFee(city, district, ward);

                if (response !== NOT_FOUND) {
                    if (response.status === SUCCESS_RESPONSE) {
                        setShippingFee(response.data.total_fee);
                        setFee(response.data.total_fee);
                        setIsGetFeeSuccess(true);
                    }
                    else {
                        setIsGetFeeSuccess(false);
                        setShippingFee(0);
                        setFee(0);
                    }
                }
                setGettingFee(false);
            }
            fetchShippingFee();
            setIsGettedFee(true);
        }
    }, [formik.values, isGettedFee, setFee])

    const debouncedValue = useDebounce(discountCode, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            return;
        }

        const total = [...cart].reduce((total, item) => total + item.price * item.quantity, 0);

        const fetchDiscount = async () => {
            const response = await getDiscount(debouncedValue, total);
            if (response !== NOT_FOUND) {
                if (response.status === SUCCESS_RESPONSE) {
                    setDiscountValue(response.data.discount_value);
                    setDiscount(response.data.discount_value);
                }
                else {
                    setDiscountValue(0);
                    setDiscount(0);
                }
            }
        }

        fetchDiscount();

    }, [debouncedValue, cart, setDiscount]);

    const handleDeleteCart = () => {
        if (cart.length > 0) {
            emptyCart();
        }
    }

    const handleOrder = (formValues) => {
        const cartProducts = [];

        [...cart].forEach(item => {
            cartProducts.push({
                productId: item.id,
                color: item.color,
                quantity: item.quantity,
                price: item.price,
            });
        });

        const data = {
            infor: {
                email: formValues.email,
                name: formValues.name,
                address: formValues.address,
                ward: formValues.ward,
                district: formValues.district,
                city: formValues.city,
                phone: formValues.phoneNumber,
                shipping_fee: shippingFee,
                discount_code: discountValue === 0 ? null : discountCode,
                total_price: [...cart].reduce((total, item) => total + item.price * item.quantity, 0) + shippingFee - discountValue,
                note: formValues.note,
                delivery_type: "Standard",
                payment_type: formValues.paymentMethod
            },
            product: cartProducts
        }

        const fetchAddOrder = async () => {
            setIsOrdering(true);
            let res;
            if (user && user.auth) {
                res = await addOrder(data);
            }
            else if (user) {
                res = await addOrderGuest(data);
            }
            if (res && res !== NOT_FOUND) {
                if (res.status && res.status === SUCCESS_RESPONSE) {
                    alert("Order thành công!");
                    if (formik.values.paymentMethod === "tranfer") {
                        navigate("/checkout");
                    }
                    else {
                        emptyCart();
                        if (user.auth) {
                            navigate("/profile/0");
                        }
                    }
                }
                else alert(res.message);
            }
            else alert("Lỗi! Không thể thêm order! Vui tạo tài khoản (đăng nhập) để tiếp tục");
            setIsOrdering(false);
        }

        fetchAddOrder();
    }
    return (
        <>
            <Container className="mt-3 mb-3 bg-white rounded">
                <div align="center" className="fs-1 fw-bolder text-secondary">SHOPPING CART</div>
            </Container>

            <Container className="mt-3 mb-3 bg-white rounded">
                <Row className="p-3 fs-4 fst-nomal">
                    <Col>THÔNG TIN GIỎ HÀNG</Col>
                    <Col xs="auto"><Link to={"/"} className="d-flex align-items-center"><BiLeftArrowAlt />CHỌN TIẾP SẢN PHẨM KHÁC</Link></Col>
                    <Col xs="auto"><span className={clsx(styles.buttonDelete, "text-danger")} onClick={handleDeleteCart}>XÓA GIỎ HÀNG</span></Col>
                </Row>
                <Row><HorizontalLine className="opacity-25" /></Row>
                <Row className="p-3 fs-4">
                    <Col md={12} lg={6}>Sản phẩm</Col>
                    <Col align="center">Đơn giá</Col>
                    <Col align="center">Số lượng</Col>
                    <Col align="center">Số tiền</Col>
                    <Col align="center">Thao tác</Col>
                </Row>
            </Container>
            {
                cartItems.length > 0
                    ?
                    cartItems.map(item => (<CartItem key={`${item.id}-${item.color}`} data={item} />))
                    :
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>"0 sản phẩm trong giỏ hàng"</div>
            }
            {
                cartItems.length > 0 &&
                <Container className="mt-3 mb-3 bg-white rounded">
                    <form className="row" onSubmit={formik.handleSubmit}>
                        <Col sm={12} lg={6} className={clsx(styles.customer)}>
                            <div className={clsx(styles.title, "d-flex align-items-center fs-4")}>
                                &nbsp;
                                <FaMapMarkedAlt className="fs-1" />
                                &nbsp;
                                ĐỊA CHỈ NHẬN HÀNG
                            </div>

                            <Container className={clsx(styles.customerForm)}>
                                <Row>
                                    <Col>
                                        <Row>
                                            <input
                                                className={clsx("col form-control", styles.formInput)}
                                                type="text" name="name"
                                                placeholder="Họ và tên"
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                            />
                                            {formik.errors.name && formik.touched.name ? (
                                                <div className={clsx(styles.inValidMessage)}>{formik.errors.name}</div>
                                            ) : null}
                                        </Row>
                                        <Row>
                                            <input
                                                className={clsx("col form-control", styles.formInput)}
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                            />
                                            {formik.errors.email && formik.touched.email ? (
                                                <div className={clsx(styles.inValidMessage)}>{formik.errors.email}</div>
                                            ) : null}
                                        </Row>
                                        <Row>
                                            <input
                                                className={clsx("col form-control", styles.formInput)}
                                                type="text"
                                                name="phoneNumber"
                                                placeholder="Số điện thoại"
                                                onChange={formik.handleChange}
                                                value={formik.values.phoneNumber}
                                            />
                                            {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                                                <div className={clsx(styles.inValidMessage)}>{formik.errors.phoneNumber}</div>
                                            ) : null}
                                        </Row>
                                        <Row>
                                            <select
                                                className={clsx("col form-select text-secondary", styles.formInput)}
                                                name="city"
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('district', '');
                                                    formik.setFieldValue('ward', '');
                                                    setIsGettedFee(false);
                                                }}
                                                value={formik.values.city}
                                            >
                                                <option value="">Chọn tỉnh, thành phố</option>
                                                {
                                                    province.map(city => <option key={city.code} value={city.name}>{city.name}</option>)
                                                }
                                            </select>
                                            {formik.errors.city && formik.touched.city ? (
                                                <div className={clsx(styles.inValidMessage)}>{formik.errors.city}</div>
                                            ) : null}
                                        </Row>
                                        <Row>
                                            <select
                                                className={clsx("col form-select text-secondary", styles.formInput)}
                                                name="district"
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('ward', '');
                                                    setIsGettedFee(false);
                                                }}
                                                value={formik.values.district}
                                            >
                                                <option value="">Chọn quận, huyện</option>
                                                {
                                                    formik.values.city && formik.values.city.length > 0
                                                    &&
                                                    province.find(item => item.name === formik.values.city)?.districts.map(item => <option key={item.code} value={item.name}>{item.name}</option>)
                                                }
                                            </select>
                                            {formik.errors.district && formik.touched.district ? (
                                                <div className={clsx(styles.inValidMessage)}>{formik.errors.district}</div>
                                            ) : null}
                                        </Row>
                                        <Row>
                                            <select
                                                className={clsx("col form-select text-secondary", styles.formInput)}
                                                name="ward"
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    setIsGettedFee(false);
                                                }}
                                                value={formik.values.ward}
                                            >
                                                <option value="">Chọn xã, phường</option>
                                                {
                                                    formik.values.city && formik.values.city.length > 0
                                                    &&
                                                    province.find(item => item.name === formik.values.city)?.districts.find(item => item.name === formik.values.district)?.wards.map(item => <option key={item.code} value={item.name}>{item.name}</option>)
                                                }
                                            </select>
                                            {formik.errors.ward && formik.touched.ward ? (
                                                <div className={clsx(styles.inValidMessage)}>{formik.errors.ward}</div>
                                            ) : null}
                                        </Row>
                                        <Row>
                                            <input
                                                className={clsx("col form-control", styles.formInput)}
                                                type="text"
                                                name="address"
                                                placeholder="Tòa nhà, Tên đường..."
                                                onChange={formik.handleChange}
                                                value={formik.values.address}
                                            />
                                            {formik.errors.address && formik.touched.address ? (
                                                <div className={clsx(styles.inValidMessage)}>{formik.errors.address}</div>
                                            ) : null}
                                        </Row>
                                    </Col>
                                    <Col>
                                        <textarea
                                            className={clsx("form-control", styles.formNote)}
                                            name="note"
                                            placeholder="Nhập ghi chú cho chúng tôi"
                                            onChange={formik.handleChange}
                                            value={formik.values.note}
                                        />
                                    </Col>
                                </Row>
                            </Container>

                        </Col>
                        <Col sm={12} lg={6} className={clsx(styles.customer)}>
                            <div className={clsx(styles.title, "d-flex align-items-center fs-4")}>
                                &nbsp;
                                <FaCreditCard className="fs-1" />
                                &nbsp;
                                HÌNH THỨC THANH TOÁN
                            </div>
                            <Container>
                                <Row className="form-check">
                                    <Col>
                                        <input
                                            className="form-check-input"
                                            id="cash"
                                            type="radio"
                                            name="paymentMethod"
                                            value={"cash"}
                                            onChange={formik.handleChange}
                                        />
                                        <label className="form-check-label text-secondary user-select-none" htmlFor="cash">
                                            Thanh toán tiền mặt khi nhận hàng
                                        </label>
                                    </Col>
                                </Row>
                                <Row className="form-check">
                                    <Col>
                                        <input
                                            className="form-check-input"
                                            id="tranfer"
                                            type="radio"
                                            name="paymentMethod"
                                            value={"tranfer"}
                                            onChange={formik.handleChange} />
                                        <label className="form-check-label text-secondary user-select-none" htmlFor="tranfer">
                                            Thanh toán qua chuyển khoản
                                        </label>
                                    </Col>
                                </Row>
                                {formik.errors.paymentMethod && formik.touched.paymentMethod ? (
                                    <div className={clsx(styles.inValidMessage)}>{formik.errors.paymentMethod}</div>
                                ) : null}

                                <Row>
                                    <input
                                        className={clsx("col form-control mt-3", styles.formInput)}
                                        type="text"
                                        name="discount"
                                        placeholder="Mã giảm giá..."
                                        onChange={(e) => setDiscountCode(e.target.value.trim())}
                                    />
                                </Row>

                                {
                                    cart.length > 0 &&
                                    <Row>
                                        <Col align='end' className="fs-3">
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <th><span className="text-secondary">Số lượng: </span></th>
                                                        <td><span className="text-danger">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                                                            <span className="text-secondary"> sản phẩm</span></td>
                                                    </tr>
                                                    <tr>
                                                        <th><span className="text-secondary">Phí giao hàng: </span></th>
                                                        <td>
                                                            {
                                                                gettingFee ?
                                                                    <Spinner size="sm" />
                                                                    :
                                                                    isGetFeeSuccess ?
                                                                        <span className="text-danger fs-2">{(shippingFee).toLocaleString('en-US')} đ</span>
                                                                        : <span className="text-danger fs-5">Không tính được</span>
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th><span className="text-secondary">Tổng giá: </span></th>
                                                        <td>
                                                            <span className="text-danger fs-2">{(cart.reduce((total, item) => total + item.quantity * item.price, 0)).toLocaleString('en-US')} đ</span>
                                                        </td>
                                                    </tr>
                                                    {
                                                        discountValue !== 0 &&
                                                        <tr>
                                                            <th><span className="text-secondary">Giảm giá: </span></th>
                                                            <td>
                                                                <span className="text-danger fs-2">{(discountValue).toLocaleString('en-US')} đ</span>
                                                            </td>
                                                        </tr>
                                                    }
                                                    <tr>
                                                        <th><span className="text-secondary">Tổng tiền: </span></th>
                                                        <td>
                                                            <span className="text-danger fs-2">{(cart.reduce((total, item) => total + item.quantity * item.price, 0) + shippingFee - discountValue).toLocaleString('en-US')} đ</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </Col>
                                    </Row>
                                }
                                <Button className={clsx(styles.buttonPay)} type="submit" disabled={isOrdering}>
                                    {isOrdering ? <Spinner /> : "Đặt mua ngay"}
                                </Button>
                            </Container>
                        </Col>
                    </form>
                </Container>
            }
        </>
    );
}

export default Cart;
