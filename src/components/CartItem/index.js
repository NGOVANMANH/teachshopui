import { Container, Row, Col, Image } from "react-bootstrap";
import clsx from "clsx";
import { useContextData } from "../../hooks";

import styles from './CartItem.module.scss';
import { FaRegCircleXmark } from "react-icons/fa6";

const CartItem = ({ data }) => {

    const { updateQuantity, deleteCartItem } = useContextData();

    const handleDelete = () => {
        deleteCartItem(data.id, data.color);
    }
    const handleQuantityChange = (value) => {
        updateQuantity(data.id, data.color, value);
    }

    return (
        <Container className="bg-white rounded mt-3 mb-3">
            <Row className="fs-4 p-3">
                <Col md={12} lg={6} className="d-flex">
                    <Image className={clsx(styles.thumnail)} src={`data:image/jpeg;base64, ${data.image}`} alt="thumnail" />
                    <div className={clsx.description}>
                        <div className={clsx(styles.title, "fs-4")}>{data.name}</div>
                        <div className={clsx(styles.brand, "fs-5 text-secondary")}>Brand: {data.brand}</div>
                        <div className={clsx(styles.color, "fs-5 text-secondary")}>Color: {data.color}</div>
                    </div>
                </Col>
                <Col className="d-flex align-items-center justify-content-center text-secondary">{data.price.toLocaleString('en-US')} đ</Col>
                <Col className="d-flex align-items-center justify-content-center text-secondary">
                    <span className={clsx(styles.quantityButton)} onClick={() => handleQuantityChange(-1)}>-</span>
                    {data.quantity}
                    <span className={clsx(styles.quantityButton)} onClick={() => handleQuantityChange(1)}>+</span>
                </Col>
                <Col className="d-flex align-items-center justify-content-center text-danger">{(data.quantity * data.price).toLocaleString('en-US')} đ</Col>
                <Col className="d-flex align-items-center justify-content-center fs-1"><span onClick={handleDelete} style={{ cursor: "pointer" }}><FaRegCircleXmark className="text-secondary" /></span></Col>
            </Row>
        </Container>
    );
}
export default CartItem;
