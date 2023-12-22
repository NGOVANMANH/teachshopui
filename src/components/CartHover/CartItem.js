import clsx from "clsx";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from './CartHover.module.scss';

const CartItem = ({ data }) => {
    return (
        <Link to={`/product/${data.id}`} className={clsx("row p-2", styles.cart_item)}>
            <div className="col-md-auto">
                <Image
                    rounded
                    src={`data:image/jpeg;base64, ${data.image}`}
                    alt="thumnail"
                    className={clsx(styles.image)}
                />
            </div>
            <div className="col">
                <div className={clsx(styles.title)}>{data.name}</div>
                <div className="fs-5 text-secondary">Color: {data.color}</div>
                <div className="d-flex mt-2">
                    <div className={clsx("col fs-5", styles.num)}>SL: {data.quantity}</div>
                    <div className={clsx("col-md-auto text-danger", styles.price)}>{(data.price * data.quantity).toLocaleString('en-US')} đ</div>
                </div>
            </div>
        </Link>
    );
}

export default CartItem;
