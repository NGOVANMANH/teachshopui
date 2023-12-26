import { Link } from "react-router-dom";
import styles from './SearchProductItem.module.scss';
import clsx from "clsx";
import { Row, Col, Container } from "react-bootstrap";

const SearchProductItem = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`}>
            <Container className={clsx("mt-1 mb-1", styles.container)}>
                <Row>
                    <Col sm='auto'>
                        <img className={clsx(styles.img)} src={product && `data:image/jpeg;base64, ${product.image}`} alt={product && product.name} />
                    </Col>
                    <Col>
                        <Row>
                            <Col className="fs-5 text-success">{!product ? "product" : product.name}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <span className="fs-4 text-danger"><span className="fs-5 text-dark">Giá:</span> {!product ? "price" : product.price.toLocaleString('en-US')} đ</span>
                                {" "}
                                {
                                    product.pre_discount === 0 ? <></> :
                                        <span className={clsx(styles.prePrice, "text-decoration-line-through text-secondary fs-6")}>{product.pre_discount.toLocaleString('en-US')} đ</span>

                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Link>
    );
}

export default SearchProductItem;
