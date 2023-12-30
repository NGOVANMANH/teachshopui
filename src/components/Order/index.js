import { useState } from "react";
import clsx from "clsx";
import { FaXmark } from "react-icons/fa6";

import styles from './Order.module.scss';
import OrderDetail from "./OrderDetail";
import { cancelOrder } from "../../services/orderServices";
import { Spinner } from "react-bootstrap";
import { NOT_FOUND } from "../../services/constants";
import { toast } from "react-toastify";

const Order = ({ data }) => {
    const [isShowMore, setIsShowMore] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [status, setStatus] = useState(data.status);

    const handelCancelOrder = async (e) => {
        e.preventDefault();
        if (data.id) {
            setIsCancelling(true);
            const response = await cancelOrder(data.id);
            if (response !== NOT_FOUND && response.status === 200) {
                toast.success("Hủy đơn thành công!")
                setStatus("Cancelled");
            }
            else {
                toast.error(response.message || "Lỗi")
            }
            setIsCancelling(false);
            setIsShowMore(false);
        }
    }

    return (
        <>
            <tr onClick={() => setIsShowMore(!isShowMore)} className={clsx(styles.order_row, styles.cursor_poiter)}>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.order_date}</td>
                <td className="fw-bolder">{data.payment_type}</td>
                <td className={clsx("fw-bold", {
                    "text-success": data.status === "Done",
                    "text-danger": status === "Cancelled",
                })}>{status}</td>
                <td className="fw-bolder">{data.total_price.toLocaleString('en-US')} đ</td>
                <td>
                    {
                        isShowMore && data.order_detail && data.order_detail.length > 0 &&
                        <div className={clsx(styles.fixed_box)} onClick={() => setIsShowMore(false)}>
                            <div className={clsx(styles.wrapper)} onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                                <FaXmark onClick={() => setIsShowMore(false)} />
                                {data.status === 'Processing' && <div className={clsx(styles.cancel_button)} onClick={handelCancelOrder}>{isCancelling ? <Spinner /> : "Hủy đơn"}</div>}
                                <div className={clsx(styles.products)}>
                                    {
                                        data && data.order_detail && data.order_detail.map((item, index) => <OrderDetail key={`${item.id}-${index}`} data={item} />)
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </td>
            </tr>
        </>
    );
}

export default Order;
