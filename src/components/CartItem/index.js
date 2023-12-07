import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";

import styles from './CartItem.module.scss';
import { FaRegCircleXmark } from "react-icons/fa6";
import testProduct from '../../services/testProduct.json';

const CartItem = () => {
    const [productCart, setProductCart] = useState({
        ...testProduct,
        num: 1
    })
    const handleDelete = () => {
        alert(testProduct.id);
    }
    const handleQuantityChange = (value) => {
        if (productCart.num + value === 0) {
            handleDelete();
        }
        else {
            setProductCart({
                ...productCart,
                num: productCart.num + value
            })
        }
    }

    return (
        <Container className="bg-white rounded mt-3 mb-3">
            <Row className="fs-4 p-3">
                <Col md={6} className="d-flex">
                    <img className={clsx(styles.thumnail)} src={`data:image/jpeg;base64, ${productCart.image}`} alt="thumnail" />
                    <div className={clsx.description}>
                        <div className={clsx(styles.title, "fs-4")}>{productCart.name}</div>
                        <div className={clsx(styles.brand, "fs-5 text-secondary")}>Brand: {productCart.brand}</div>
                        <div className={clsx(styles.color, "fs-5 text-secondary")}>Color: {productCart.color}</div>
                    </div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center text-secondary">{productCart.price.toLocaleString('en-US')} đ</Col>
                <Col className="d-flex align-items-center justify-content-center text-secondary">
                    <span className={clsx(styles.quantityButton)} onClick={() => handleQuantityChange(-1)}>-</span>
                    {productCart.num}
                    <span className={clsx(styles.quantityButton)} onClick={() => handleQuantityChange(1)}>+</span>
                </Col>
                <Col className="d-flex align-items-center justify-content-center text-danger">{(productCart.num * productCart.price).toLocaleString('en-US')} đ</Col>
                <Col className="d-flex align-items-center justify-content-center fs-1"><span onClick={handleDelete}><FaRegCircleXmark /></span></Col>
            </Row>
        </Container>
    );
}
export default CartItem;
