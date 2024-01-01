import { useFormik } from "formik";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { getOrdersGuest } from "../../services/orderServices";
import { NOT_FOUND } from "../../services/constants";
import { toast } from "react-toastify";
import { Order } from "../../components";

const OrderGuest = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isSuscess, setIsSuscess] = useState(false);
    const [orders, setOrders] = useState([]);

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            phone: '',
        },
        onSubmit: values => {
            const fetchOrderGuest = async () => {
                setIsLoading(true);
                const response = await getOrdersGuest(values);
                if (response !== NOT_FOUND) {
                    setOrders(response.orders);
                    setIsSuscess(true)
                }
                else {
                    toast.success("Lỗi");
                    setIsSuscess(false)
                }
                setIsLoading(false);
            }
            fetchOrderGuest();
        }
    });

    return (
        <>
            <form className="container bg-white rounded" onSubmit={formik.handleSubmit}>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th colSpan={2} className="text-center fs-1">Tra cứu đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="col-lg-2">Mã đơn hàng</th>
                            <td className="col-lg-10">
                                <input type="text" name="id" placeholder="Mã đơn hàng..." className="form-control form-control-lg"
                                    value={formik.values.id}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="col-lg-2">Tên khách hàng</th>
                            <td className="col-lg-10">
                                <input type="text" name="name" placeholder="Tên khách hàng..." className="form-control form-control-lg"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="col-lg-2">Số điện thoại</th>
                            <td className="col-lg-10">
                                <input type="text" name="phone" placeholder="Số điện thoại khách hàng..." className="form-control form-control-lg"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit" className="btn btn-secondary fs-4"
                                    disabled={isLoading}
                                >{isLoading ? <Spinner /> : "Tìm đơn hàng"}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {
                isSuscess && <div className="container bg-white rounded">
                    {
                        orders && orders.length > 0 ?
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th colSpan={6} className="fs-3 text-center text-secondary">Thông tin order</th>
                                    </tr>
                                    <tr>
                                        <th>Người nhận</th>
                                        <th>Địa chỉ nhận hàng</th>
                                        <th>Ngày đặt hàng</th>
                                        <th>Phương thức thanh toán</th>
                                        <th>Trạng thái</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map(item => <Order key={item.id} data={item} />)
                                    }
                                </tbody>
                            </table> :
                            "Không tìm thấy order nào!"
                    }
                </div>
            }
        </>
    );
}
export default OrderGuest;
