import { useState } from "react";
import OrderDetail from "./OrderDetail";

const Order = ({ data }) => {
    const [isShowMore, setIsShowMore] = useState(false);
    return (
        <>
            <div onClick={() => setIsShowMore(!isShowMore)} style={{ cursor: "pointer" }}>
                Địa chỉ: {data.address}, Tổng tiền: {data.total_price}, Ngày order: {data.order_date}, Phương thức: {data.payment_type}, Trạng thái: {data.status}
            </div>
            {
                isShowMore && data.order_detail && data.order_detail.length > 0 &&
                <div>
                    {
                        data.order_detail.map((item, index) => <OrderDetail key={`${item.id}-${index}`} data={item} />)
                    }
                </div>
            }
        </>
    );
}

export default Order;
