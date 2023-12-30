import { useEffect, useState } from "react";
import { useContextData } from "../../hooks";
import CartItem from "../../components/CartHover/CartItem";
import { Spinner } from "react-bootstrap";
import { MdDoneAll } from "react-icons/md";

const Checkout = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { cart, total, fee, discount, emptyCart } = useContextData();

    const [isSendingReq, setIsSendingReq] = useState(false);

    const [isDone, setIsDone] = useState(false);

    const handleDoneTranfer = () => {
        setIsSendingReq(true);
        setTimeout(() => {
            setIsSendingReq(false);
            setIsDone(true);
            emptyCart();
        }, 500)
    }

    return (
        <>
            <div className="container mt-3 mb-3 bg-white rounded">
                <div align="center" className="fs-1 fw-bolder text-secondary text-capitalize">Chuyển khoản đến ngân hàng VCB</div>
            </div>
            <div className="bg-white rounded container p-3">
                <div className="row">
                    <div className="col-lg-auto p-3 d-flex justify-content-center">
                        <img src="https://img.vietqr.io/image/vietcombank-1025884939-qr_only.png" alt="qr_code_vcb" />
                    </div>
                    <div className="col">
                        <div style={{ maxHeight: "45.5rem", overflowY: "scroll", overflowX: "hidden", padding: "0.5rem" }}>
                            {cart.map(item => <CartItem key={`${item.id}-${item.color}`} data={item} />)}
                        </div>
                        <div className="text-end fs-3 text-secondary">
                            <button className="btn btn-secondary m-4 fs-2" onClick={handleDoneTranfer}>{isSendingReq ? <Spinner /> : isDone ? <MdDoneAll /> : "Done"}</button>
                            Total: <span className="text-danger fs-2 fw-bold">{(total + fee - discount).toLocaleString('en-US')}</span> đ
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Checkout;
