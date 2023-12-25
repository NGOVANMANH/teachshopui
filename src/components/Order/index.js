import { useState } from "react";
import clsx from "clsx";

import styles from './Order.module.scss';
import OrderDetail from "./OrderDetail";

const Order = ({ data }) => {
    const [isShowMore, setIsShowMore] = useState(false);
    return (
        <>
            <tr onClick={() => setIsShowMore(!isShowMore)} className={clsx(styles.order_row, styles.cursor_poiter)}>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.order_date}</td>
                <td className="fw-bolder">{data.payment_type}</td>
                <td className={clsx("fw-bold", {
                    "text-success": data.status === "Done",
                    "text-danger": data.status === "Cancel",
                })}>{data.status}</td>
                <td className="fw-bolder">{data.total_price.toLocaleString('en-US')} đ</td>
                <td>
                    {
                        isShowMore && data.order_detail && data.order_detail.length > 0 &&
                        <div className={clsx(styles.fixed_box)} onClick={() => setIsShowMore(false)}>
                            <div className={clsx(styles.wrapper)} onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                                {
                                    data.order_detail.map((item, index) => <OrderDetail key={`${item.id}-${index}`} data={item} />)
                                }
                            </div>
                        </div>
                    }
                </td>
            </tr>
        </>
    );
}

export default Order;
