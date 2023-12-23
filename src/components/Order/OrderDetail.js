import { Image } from "react-bootstrap";

const OrderDetail = ({ data }) => {
    return (
        <div>
            <Image className="w-25" thumbnail src={`data:image/jpeg;base64, ${data.image}`} alt="thumnail" />
            Giá: {data.price}, Số lượng: {data.quantity}
        </div>
    );
}

export default OrderDetail;
