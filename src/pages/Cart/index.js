import { Col, Container, Row } from "react-bootstrap";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaMapMarkedAlt, FaCreditCard } from "react-icons/fa";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { CartItem, HorizontalLine } from "../../components";
import styles from './Cart.module.scss';

const Cart = () => {
    const cart = [1, 2, 3, 4, 5];

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
                <Row>
                    <Col className={clsx(styles.customer)}>
                        <div className={clsx(styles.title, "d-flex align-items-end fs-4")}>
                            <FaMapMarkedAlt className="fs-1" />
                            &nbsp;
                            ĐỊA CHỈ NHẬN HÀNG
                        </div>

                    </Col>
                    <Col className={clsx(styles.customer)}>
                        <div className={clsx(styles.title, "d-flex align-items-end fs-4")}>
                            <FaCreditCard className="fs-1" />
                            &nbsp;
                            HÌNH THỨC THANH TOÁN
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Cart;
