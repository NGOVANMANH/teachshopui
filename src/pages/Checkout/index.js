import { useContextData } from "../../hooks";
import CartItem from "../../components/CartHover/CartItem";


const Checkout = () => {
    const { cart, total, fee, discount } = useContextData();

    return (
        <>
            <div className="container mt-3 mb-3 bg-white rounded">
                <div align="center" className="fs-1 fw-bolder text-secondary text-capitalize">Chuyển khoản đến ngân hàng VCB</div>
            </div>
            <div className="bg-white rounded container p-3">
                <div className="row">
                    <div className="col-md-auto p-3">
                        <img src="https://img.vietqr.io/image/vietcombank-1025884939-qr_only.png" alt="qr_code_vcb" />
                    </div>
                    <div className="col">
                        <div style={{ maxHeight: "45.5rem", overflowY: "scroll", overflowX: "hidden", padding: "0.5rem" }}>
                            {cart.map(item => <CartItem key={`${item.id}-${item.color}`} data={item} />)}
                        </div>
                        <div className="text-end fs-1">Total: <span className="text-danger">{(total + fee - discount).toLocaleString('en-US')}</span> đ</div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Checkout;
