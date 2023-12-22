import CartItem from "./CartItem";
import { useContextData } from "../../hooks";

const CartHover = () => {

    const { cart } = useContextData();

    return (
        <div className="container">
            {
                cart && cart.length > 0
                    ?
                    cart.map(item => <CartItem key={`${item.id}-${item.color}`} data={item} />)
                    :
                    <div className="text-center text-secondary mt-3 mb-3">Không có sản phẩm trong giỏ hàng</div>
            }
        </div>
    );
}

export default CartHover;
