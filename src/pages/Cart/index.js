import clsx from "clsx";
import styles from "./Cart.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const Cart = () => {
    return (
        <Container className="mb-3">
            <Row>
                <Col sm={7} className={clsx("bg-white", styles.Cart)}>
                    col1
                </Col>
                <Col className={clsx("bg-white", styles.Total)}>
                    col2
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
