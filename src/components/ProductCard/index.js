import { Card, Button } from 'react-bootstrap';
import slides from "../../services/slides.json";
import styles from './ProductCard.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const ProductCard = () => {
    const data = slides[1];
    const handleClick = (event) => {
        event.preventDefault();
        alert("Thêm vào giỏ hàng")
    }
    return (
        <Link to={"/productdetails"}>
            <Card className={clsx(styles.card)}>
                <div className={clsx(styles.cardImgContainer)}>
                    <Card.Img variant='top' src={data.image} className={clsx(styles.cardImg)} />
                </div>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                        {data.subTitle.substring(0, 80) + ' ...'}
                    </Card.Text>
                </Card.Body>

                <Button onClick={handleClick} variant="primary">Thêm vào giỏ hàng</Button>
            </Card>
        </Link>
    );
}

export default ProductCard;
