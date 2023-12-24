import { Col, Image, Row } from "react-bootstrap";

const OrderDetail = ({ data }) => {
    return (
        <Row>
            <Col md={2}>
                <Image thumbnail src={`data:image/jpeg;base64, ${data.image}`} alt="thumnail" />
            </Col>
            <Col>
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="w-25">Giá:</th>
                            <td>{data.price.toLocaleString('en-US')} đ</td>
                        </tr>
                        <tr>
                            <th className="w-25">Số lượng:</th>
                            <td>{data.quantity}</td>
                        </tr>
                    </tbody>
                </table>
            </Col>
        </Row>
    );
}

export default OrderDetail;
