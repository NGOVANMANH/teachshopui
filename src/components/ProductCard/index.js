import { Card, Button } from 'react-bootstrap';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useContextData } from '../../hooks';
import styles from './ProductCard.module.scss';

const ProductCard = ({ product }) => {

    const { cart, setCart } = useContextData();

    const handleAddToCart = (event) => {
        event.preventDefault();

        const _cart = [...cart];

        const existingProduct = _cart.find(item => item.id === product.id);

        if (existingProduct) {
            alert("Sản phẩm đã có trong giỏ hàng!");
        }
        else {
            _cart.push({
                ...product,
                num: 1,
            })
        }
        setCart(_cart);
    }

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
                    {/* <Card.Subtitle className='mt-1'>Mô tả: {product.name}</Card.Subtitle> */}
                </Card.Body>
                <Card.Body className='position-absolute bottom-0 mb-5'>
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
                <Button onClick={handleAddToCart} variant="primary">Thêm vào giỏ hàng</Button>
            </Card>
        </Link>
    );
}

export default ProductCard;
