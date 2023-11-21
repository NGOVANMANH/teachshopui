import clsx from "clsx";
import styles from "./Cart.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { HorizontalLine } from "../../components";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsCartCheckFill } from "react-icons/bs";


const Cart = ({ cart }) => {
    cart = [1, 2, 3, 4, 5];
    return (
        <Container className="mb-3" style={{ minHeight: "100vh" }}>
            <Row>
                <Col sm={8} className={clsx("bg-white", styles.Cart)}>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center ."><BsCartCheckFill /><span>Giỏ hàng</span></Col>
                    </Row>
                    <Row>
                        <Col sm={5}>Tên sản phẩm</Col>
                        <Col className="d-flex justify-content-end">Đơn giá</Col>
                        <Col className="d-flex justify-content-center">Số lượng</Col>
                        <Col className="d-flex justify-content-end">Thành tiền</Col>
                        <Col className="d-flex justify-content-center">Thao tác</Col>
                    </Row>
                    <HorizontalLine />
                    {cart.map((item, index) => (
                        <Row key={index}>
                            <Col sm={5}>
                                <img style={{ width: "15%", margin: "1rem" }} src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR2MnR3BqL0lz5PYOZY0wou7-BUFZFK7rYViwF3CN1CmkiXMFjeNCnJHwZi5-otH27W4VgkAG_jVPjWM3FFNbec39bVfQqdn6gyV9z3TFREDKCtBAkNVSHsC6qrEr9dkDC2S_y8qF8&usqp=CAc" alt="ip11" />
                                <span>Product {item}</span>
                            </Col>
                            <Col className="d-flex justify-content-end align-items-center">35.000.000đ</Col>
                            <Col className="d-flex justify-content-center align-items-center">10</Col>
                            <Col className="d-flex justify-content-end align-items-center">350.000.000đ</Col>
                            <Col className="d-flex justify-content-center align-items-center">
                                <button><FaRegTrashCan /></button>
                            </Col>
                        </Row>
                    ))}
                </Col>
                <Col className={clsx("bg-white", styles.Total)}>
                    <Row>
                        <Col>Tạm tính</Col>
                    </Row>
                    <HorizontalLine />
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
