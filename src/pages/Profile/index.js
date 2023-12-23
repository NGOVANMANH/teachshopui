import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './Profile.module.scss';
import clsx from 'clsx';
import { useContextData } from '../../hooks';
import { updateInfor, updatePassword } from '../../services/userServices';
import { getOrders } from '../../services/orderServices';
import { NOT_FOUND, SUCCESS_RESPONSE } from '../../services/constants';
import { Order } from '../../components';

const Profile = () => {

    const { user, setUser, address } = useContextData();

    useEffect(() => {
        document.title = `${!user.userInfor.name ? "Customer Profile" : user.userInfor.name} - TechShop`;
    }, [user]);

    const [selectedButton, setSelectedButton] = useState(-1);

    const [isUpdatingInfor, setIsUpdatingInfor] = useState(false);

    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    const { activeKey } = useParams();

    useEffect(() => {
        setSelectedButton(+activeKey);
    }, [activeKey])

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoadingOrders(true);
            const res = await getOrders();
            if (res !== NOT_FOUND) {
                setOrders(res.orders);
            }
            setIsLoadingOrders(false);
        }

        fetchOrders();
    }, [])

    const formikUpdatePassword = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: values => {
            setIsUpdatingPassword(true);
            const fetchApi = async () => {
                const res = await updatePassword(localStorage.getItem("token"), values.oldPassword, values.newPassword);
                if (res === NOT_FOUND) {
                    alert("Update lỗi!");
                }
                else {
                    alert(res.message);
                }
                setIsUpdatingPassword(false);
            }
            fetchApi();
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().min(8, "Trường này ít nhất 8 kí tự!").required("Vui lòng nhập trường này!"),
            newPassword: Yup.string().min(8, "Trường này ít nhất 8 kí tự!").max(30, "Quá dài!").required("Vui lòng nhập trường này!"),
            confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], "Password không khớp!").required("Vui lòng nhập trường này!"),
        })
    })


    const formikUpdateInfor = useFormik({
        initialValues: {
            name: user.userInfor.name,
            email: user.userInfor.email,
            address: user.userInfor.address,
            city: user.userInfor.city,
            district: user.userInfor.district,
            ward: user.userInfor.ward,
            phone: user.userInfor.phone,
        },
        onSubmit: values => {
            const fetchApi = async () => {
                setIsUpdatingInfor(true);
                const respone = await updateInfor(localStorage.getItem("token"), values)
                if (respone === NOT_FOUND) {
                    alert("Cập nhật không thành công!");
                }
                else {
                    if (respone.status === SUCCESS_RESPONSE) {
                        alert("Cập nhật thành công!");
                        window.location.reload();
                    }
                    else {
                        alert(respone.message);
                    }
                }
                setIsUpdatingInfor(false);
            }

            fetchApi();
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required!"),
            email: Yup.string().email().required("Required!"),
            address: Yup.string().required("Required!"),
            city: Yup.string().required("Required!"),
            district: Yup.string().required("Required!"),
            ward: Yup.string().required("Required!"),
            phone: Yup.string().required("Required!"),
        })
    })

    const handleClick = (event) => {
        setSelectedButton(Number(event.target.value));
    }

    const handleLogout = () => {
        setUser({
            auth: false,
            userInfor: {},
        })

        localStorage.removeItem("token");

        navigate("/");
        window.location.reload();
    }

    return (
        <div className={clsx(styles.profile, "d-block container bg-white mt-3 mb-3 rounded")}>
            <div className="row">
                <div className={clsx(styles.account_left, "col-md-3")}>
                    <div className={clsx(styles.account_left_title)}>
                        Đơn hàng đặt mua
                    </div>

                    <Button
                        className={clsx('d-block w-100', styles.account_button, {
                            [styles.active]: selectedButton === 0,
                        })}
                        variant='secondary'
                        size='lg'
                        onClick={handleClick}
                        value={0}
                    >
                        Danh sách đặt hàng
                    </Button>
                    <div className={clsx(styles.account_left_title)}>
                        Thông tin tài khoản
                    </div>

                    <Button
                        className={clsx('d-block w-100', styles.account_button, {
                            [styles.active]: selectedButton === 1,
                        })}
                        variant='secondary'
                        size='lg'
                        onClick={handleClick}
                        value={1}
                    >
                        Thông tin cá nhân
                    </Button>

                    <Button
                        className={clsx('d-block w-100', styles.account_button, {
                            [styles.active]: selectedButton === 2,
                        })}
                        variant='secondary'
                        size='lg'
                        onClick={handleClick}
                        value={2}
                    >
                        Thay đổi mật khẩu
                    </Button>

                    <Button
                        className={clsx(styles.account_button, styles.account_button_logout, "p-2 mb-2")}
                        variant='danger'
                        size='lg'
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>

                </div>
                <div className={clsx(styles.account_right, "col")}>
                    {selectedButton === -1 && <>Bạn đang ở trang tài khoản. Vui lòng chọn các mục bên trái để xem thông tin.</>}
                    {selectedButton === 0 &&
                        <>
                            <h3 className={clsx(styles.account_right_title)}>Danh sách đơn hàng</h3>
                            {
                                isLoadingOrders ?
                                    <Spinner /> :
                                    orders.length > 0 ?
                                        <>
                                            {orders.map(item => <Order key={item.id} data={item} />)}
                                        </> :
                                        <div className={clsx(styles.account_right_content)}>
                                            Bạn chưa mua đơn hàng nào
                                        </div>
                            }
                        </>
                    }
                    {selectedButton === 1 &&
                        <>
                            <h3 className={clsx(styles.account_right_title)}>Cập nhật thông tin cá nhân</h3>
                            <div className={clsx(styles.account_right_content)}>
                                <form onSubmit={formikUpdateInfor.handleSubmit}>
                                    <Table responsive borderless>
                                        <tbody>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Họ tên</td>
                                                <td>
                                                    <input
                                                        name='name'
                                                        type='text'
                                                        className="form form-control form-control-lg"
                                                        value={formikUpdateInfor.values.name}
                                                        onChange={formikUpdateInfor.handleChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Email</td>
                                                <td>
                                                    <input
                                                        name='email'
                                                        type='email'
                                                        className="form form-control form-control-lg"
                                                        value={formikUpdateInfor.values.email}
                                                        onChange={formikUpdateInfor.handleChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Địa chỉ nhà</td>
                                                <td>
                                                    <input
                                                        name='address'
                                                        className="form form-control form-control-lg"
                                                        value={formikUpdateInfor.values.address}
                                                        onChange={formikUpdateInfor.handleChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Tỉnh / Thành phố</td>
                                                <td>
                                                    <select
                                                        name='city'
                                                        className="form-select form-select-lg"
                                                        value={formikUpdateInfor.values.city}
                                                        onChange={formikUpdateInfor.handleChange}
                                                    >
                                                        <option value="">Chọn Tỉnh / Thành phố</option>
                                                        {
                                                            address && address.length > 0 &&
                                                            address.map(item => <option key={item.code} value={item.name}>{item.name}</option>)
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Quận / Huyện</td>
                                                <td>
                                                    <select
                                                        name='district'
                                                        className="form-select form-select-lg"
                                                        value={formikUpdateInfor.values.district}
                                                        onChange={formikUpdateInfor.handleChange}
                                                    >
                                                        <option value="">Chọn Quận / Huyện</option>
                                                        {
                                                            address && address.length > 0 &&
                                                            address.find(item => item.name === formikUpdateInfor.values.city)?.districts.map(item => <option key={item.code} value={item.name}>{item.name}</option>)
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Xã / Phường</td>
                                                <td>
                                                    <select
                                                        name='ward'
                                                        className="form-select form-select-lg"
                                                        value={formikUpdateInfor.values.ward}
                                                        onChange={formikUpdateInfor.handleChange}
                                                    >
                                                        <option value="">Chọn Xã / Phường</option>
                                                        {
                                                            address && address.length > 0 &&
                                                            address.find(item => item.name === formikUpdateInfor.values.city)?.districts.find(item => item.name === formikUpdateInfor.values.district)?.wards.map(item => <option key={item.code} value={item.name}>{item.name}</option>)
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Điện thoại di động</td>
                                                <td>
                                                    <input
                                                        name='phone'
                                                        className="form form-control form-control-lg"
                                                        value={formikUpdateInfor.values.phone}
                                                        onChange={formikUpdateInfor.handleChange}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <Button type='submit' size='lg' className={clsx(styles.account_button_update)}
                                                    >
                                                        {isUpdatingInfor ? <Spinner /> : "Update"}
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </form>
                            </div>
                        </>
                    }
                    {selectedButton === 2 &&
                        <>
                            <h3 className={clsx(styles.account_right_title)}>Thay đổi mật khẩu</h3>
                            <div className={clsx(styles.account_right_content)}>
                                <form onSubmit={formikUpdatePassword.handleSubmit}>
                                    <Table responsive borderless>
                                        <tbody>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Mật khẩu cũ</td>
                                                <td>
                                                    <input
                                                        name='oldPassword'
                                                        type='password'
                                                        className="form form-control form-control-lg"
                                                        value={formikUpdatePassword.values.oldPassword}
                                                        onChange={formikUpdatePassword.handleChange}
                                                    />
                                                    {
                                                        formikUpdatePassword.errors.oldPassword && formikUpdatePassword.touched.oldPassword &&
                                                        <div className={clsx(styles.inValidMessage)}>{formikUpdatePassword.errors.oldPassword}</div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Mật khẩu mới</td>
                                                <td>
                                                    <input
                                                        name='newPassword'
                                                        type='password'
                                                        className="form form-control form-control-lg"
                                                        value={formikUpdatePassword.values.newPassword}
                                                        onChange={formikUpdatePassword.handleChange}
                                                    />
                                                    {
                                                        formikUpdatePassword.errors.newPassword && formikUpdatePassword.touched.newPassword &&
                                                        <div className={clsx(styles.inValidMessage)}>{formikUpdatePassword.errors.newPassword}</div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Nhập lại</td>
                                                <td>
                                                    <input
                                                        name='confirmPassword'
                                                        type='password'
                                                        className="form form-control form-control-lg"
                                                        value={formikUpdatePassword.values.confirmPassword}
                                                        onChange={formikUpdatePassword.handleChange}
                                                    />
                                                    {
                                                        formikUpdatePassword.errors.confirmPassword && formikUpdatePassword.touched.confirmPassword &&
                                                        <div className={clsx(styles.inValidMessage)}>{formikUpdatePassword.errors.confirmPassword}</div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <Button
                                                        type='submit' size='lg'
                                                        className={clsx(styles.account_button_update)}
                                                    >
                                                        {isUpdatingPassword ? <Spinner /> : "Update"}
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Profile;
