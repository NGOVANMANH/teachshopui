import { Button, Col, Container, Row } from "react-bootstrap";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaMapMarkedAlt, FaCreditCard } from "react-icons/fa";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";

import { CartItem, HorizontalLine } from "../../components";
import styles from './Cart.module.scss';
import { useContextData } from "../../hooks";

const Cart = () => {

    useEffect(() => {
        document.title = "Cart - Techshop";
    }, [])

    const { cart, setCart, address } = useContextData();

    const [cartItems, setCartItems] = useState([]);

    const [province, setProvince] = useState([]);

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
            name: '',
            email: '',
            phoneNumber: '',
            district: '',
            city: '',
            address: '',
            note: '',
            paymentMethod: '',
        },
        onSubmit: values => {
            alert("submit")
            console.log(values)
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Quá ngắn!').max(50, 'Quá dài!').required('Vui lòng nhập tên!'),
            email: Yup.string().email('Email không đúng định dạng!').required('Vui lòng nhập email!'),
            phoneNumber: Yup.string().min(10, 'Số điện thoại không hợp lệ!').max(12, 'Số điện thoại không hợp lệ!').required('Vui lòng nhập số điện thoại!'),
            district: Yup.string().required('Vui lòng chọn Quận huyện!'),
            city: Yup.string().required('Vui lòng chọn Thành phố!'),
            address: Yup.string().required('Vui lòng nhập địa chỉ!'),
            paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán!'),
        })
    });


    const handleDeleteCart = () => {
        setCart([]);
    }
    return (
        <>
            <Container className="mt-3 mb-3 bg-white rounded">
                <div align="center" className="fs-1 fw-bolder text-secondary">SHOPPING CART</div>
            </Container>

            <Container className="mt-3 mb-3 bg-white rounded">
                <Row className="p-3 fs-4 fst-nomal">
                    <Col md="auto">THÔNG TIN GIỎ HÀNG</Col>
                    <Col></Col>
                    <Col md="auto"><Link to={"/"} className="d-flex align-items-center"><BiLeftArrowAlt />CHỌN TIẾP SẢN PHẨM KHÁC</Link></Col>
                    <Col md="auto"><span className={clsx(styles.buttonDelete, "text-danger")} onClick={handleDeleteCart}>XÓA GIỎ HÀNG</span></Col>
                </Row>
                <Row><HorizontalLine className="opacity-25" /></Row>
                <Row className="p-3 fs-4">
                    <Col md={6}>Sản phẩm</Col>
                    <Col align="center">Đơn giá</Col>
                    <Col align="center">Số lượng</Col>
                    <Col align="center">Số tiền</Col>
                    <Col align="center">Thao tác</Col>
                </Row>
            </Container>
            {
                cartItems.length > 0
                    ?
                    cartItems.map(item => (<CartItem key={item.id} data={item} />))
                    :
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "30vh" }}>"0 sản phẩm trong giỏ hàng"</div>
            }
            {
                cartItems.length > 0 &&
                <Container className="mt-3 mb-3 bg-white rounded">
                    <form className="row" onSubmit={formik.handleSubmit}>
                        <Col className={clsx(styles.customer)}>
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
                                                onChange={formik.handleChange}
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
                                                onChange={formik.handleChange}
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
                        <Col md={5} className={clsx(styles.customer, "position-relative")}>
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
                                {
                                    cart.length > 0 &&
                                    <Row>
                                        <Col align='end' className="fs-3">
                                            <span className="text-secondary">Số lượng: </span>
                                            <span className="text-danger">{cart.length}</span>
                                            <span className="text-secondary"> sản phẩm</span>
                                            <br />
                                            <span className="text-secondary">Tổng tiền: </span>
                                            <span className="text-danger fs-2">{(cart.reduce((total, item) => total + item.num * item.price, 0)).toLocaleString('en-US')} đ</span>
                                        </Col>
                                    </Row>
                                }
                                <Button className={clsx(styles.buttonPay)} type="submit">
                                    Đặt mua ngay
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
