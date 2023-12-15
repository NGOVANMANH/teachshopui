import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";
import { useContextData } from "../../hooks";

import styles from './CartItem.module.scss';
import { FaRegCircleXmark } from "react-icons/fa6";

const CartItem = ({ data }) => {

    const { cart, setCart } = useContextData();

    const handleDelete = () => {
        const _cart = [...cart];
        setCart(_cart.filter(item => item.id !== data.id));
    }
    const handleQuantityChange = (value) => {
        if (data.quantity + value === 0) {
            handleDelete();
        }
        else {
            const _cart = [...cart];
            const thisProduct = _cart.find(item => item.id === data.id);
            if (thisProduct) {
                thisProduct.quantity += value;
                setCart(_cart);
            }
        }
    }

    return (
        <Container className="bg-white rounded mt-3 mb-3">
            <Row className="fs-4 p-3">
                <Col md={6} className="d-flex">
                    <img className={clsx(styles.thumnail)} src={`data:image/jpeg;base64, ${data.image}`} alt="thumnail" />
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
                <Col className="d-flex align-items-center justify-content-center fs-1"><span onClick={handleDelete}><FaRegCircleXmark className="text-secondary" /></span></Col>
            </Row>
        </Container>
    );
}
export default CartItem;
