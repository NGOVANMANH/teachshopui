import { Button, Col, Container, Row } from "react-bootstrap";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaMapMarkedAlt, FaCreditCard } from "react-icons/fa";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CartItem, HorizontalLine } from "../../components";
import styles from './Cart.module.scss';

const Cart = () => {
    const cart = [1, 2, 3, 4, 5];

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: '',
            province: '',
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
            province: Yup.string().required('Vui lòng chọn Tỉnh thành!'),
            city: Yup.string().required('Vui lòng chọn Thành phố!'),
            address: Yup.string().required('Vui lòng nhập địa chỉ!'),
            paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán!'),
        })
    });


    const handleDeleteCart = () => {
        alert("xoa cart");
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
                    <Col md="auto"><span className={clsx(styles.buttonDelete)} onClick={handleDeleteCart}>XÓA GIỎ HÀNG</span></Col>
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
                cart.map((item, index) => (<CartItem key={index}></CartItem>))
            }
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
                                            name="province"
                                            onChange={formik.handleChange}
                                            value={formik.values.province}
                                        >
                                            <option value="TP HCM">TP HCM</option>
                                            <option value="TP HCM2">TP HCM</option>
                                        </select>
                                        {formik.errors.province && formik.touched.province ? (
                                            <div className={clsx(styles.inValidMessage)}>{formik.errors.province}</div>
                                        ) : null}
                                    </Row>
                                    <Row>
                                        <select
                                            className={clsx("col form-select text-secondary", styles.formInput)}
                                            name="city"
                                            onChange={formik.handleChange}
                                            value={formik.values.city}
                                        >
                                            <option value="QN">Quảng ngãi</option>
                                            <option value="QN2">Quảng ngãi</option>
                                        </select>
                                        {formik.errors.city && formik.touched.city ? (
                                            <div className={clsx(styles.inValidMessage)}>{formik.errors.city}</div>
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
                            <Button className={clsx(styles.buttonPay)} type="submit">
                                Đặt mua ngay
                            </Button>
                        </Container>
                    </Col>
                </form>
            </Container>
        </>
    );
}

export default Cart;
