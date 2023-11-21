import { Card, Button } from 'react-bootstrap';
import styles from './ProductCard.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const handleClick = (event) => {
        event.preventDefault();
        alert("Thêm vào giỏ hàng")
    }
    return (
        <Link to={"/productdetails"}>
            <Card className={clsx(styles.card)}>
                <div className={clsx(styles.cardImgContainer)}>
                    <Card.Img variant='top' src={`data:image/jpeg;base64, ${product.image}`} className={clsx(styles.cardImg)} />
                </div>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className='mt-1'>Brand: {product.brand}</Card.Subtitle>
                    <Card.Subtitle className='mt-1'>Màu sắc: {product.color}</Card.Subtitle>
                </Card.Body>
                <Card.Body className='position-absolute bottom-0 mb-5'>
                    <Card.Text>
                        <span className={clsx(styles.prePrice, "text-decoration-line-through text-secondary fs-5")}>{product.pre_discount.toLocaleString('en-US')} đ</span>
                    </Card.Text>
                    <Card.Text>
                        <span className={clsx(styles.price, "text-success")}>{(product.pre_discount * (1 - product.discount_percent)).toLocaleString('en-US')} đ</span>
                    </Card.Text>
                </Card.Body>
                <Button onClick={handleClick} variant="primary">Thêm vào giỏ hàng</Button>
            </Card>
        </Link>
    );
}

export default ProductCard;
