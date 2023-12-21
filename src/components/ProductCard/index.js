import { Card } from 'react-bootstrap';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';

const ProductCard = ({ product }) => {

    return (
        <Link to={`/product/${product.id}`}>
            <Card className={clsx(styles.card)}>
                {
                    product.pre_discount !== 0
                    &&
                    <div className={clsx(styles.discountPercent, 'position-absolute')}>
                        <span>Giảm {Math.round(product.discount_percent * 100)}%</span>
                    </div>
                }
                <div className={clsx(styles.cardImgContainer)}>
                    <Card.Img variant='top' src={`data:image/jpeg;base64, ${product.image}`} className={clsx(styles.cardImg)} />
                </div>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className='mt-1'>Brand: {product.brand}</Card.Subtitle>
                </Card.Body>
                <Card.Body className='position-absolute bottom-0'>
                    {
                        product.pre_discount === 0 ? <></> :
                            <Card.Text>
                                <span className={clsx(styles.prePrice, "text-decoration-line-through text-secondary fs-5")}>{product.pre_discount.toLocaleString('en-US')} đ</span>
                            </Card.Text>
                    }
                    <Card.Text>
                        <span className={clsx(styles.price, "text-success")}>{product.price.toLocaleString('en-US')} đ</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default ProductCard;
