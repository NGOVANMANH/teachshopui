import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './Profile.module.scss';
import clsx from 'clsx';
import { useContextData } from '../../hooks';

const Profile = () => {

    const { user, setUser, address } = useContextData();

    useEffect(() => {
        document.title = `${!user.userInfor.name ? "Customer Profile" : user.userInfor.name} - TechShop`;
    }, [user]);

    const navigate = useNavigate();

    // const params = useParams();
    // console.log(params)

    const [selectedButton, setSelectedButton] = useState(-1);

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        onSubmit: values => { console.log(values) },
        validationSchema: Yup.object({
            oldPassword: Yup.string().min(8, "Trường này ít nhất 8 kí tự!").required("Vui lòng nhập trường này!"),
            newPassword: Yup.string().min(8, "Trường này ít nhất 8 kí tự!").max(30, "Quá dài!").required("Vui lòng nhập trường này!"),
            confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], "Password không khớp!").required("Vui lòng nhập trường này!"),
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
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        alert("Update Thành công!");
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
                            <div className={clsx(styles.account_right_content)}>
                                Bạn chưa mua đơn hàng nào
                            </div>
                        </>
                    }
                    {selectedButton === 1 &&
                        <>
                            <h3 className={clsx(styles.account_right_title)}>Cập nhật thông tin cá nhân</h3>
                            <div className={clsx(styles.account_right_content)}>
                                <form onSubmit={handleUpdate}>
                                    <Table responsive borderless>
                                        <tbody>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Họ tên</td>
                                                <td>
                                                    <input
                                                        name='name'
                                                        type='text'
                                                        className="form form-control form-control-lg"
                                                        required
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
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Địa chỉ nhà</td>
                                                <td>
                                                    <input
                                                        name='address'
                                                        className="form form-control form-control-lg"
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Tỉnh/Thành phố</td>
                                                <td>
                                                    <select name='city' className="form-select form-select-lg" required>
                                                        <option value="">Chọn Tỉnh / Thành phố</option>
                                                        {
                                                            address && address.length > 0 &&
                                                            address.map(item => <option key={item.code} value={item.name}>{item.name}</option>)
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
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <Button type='submit' size='lg' className={clsx(styles.account_button_update)}>Update</Button>
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
                                <form onSubmit={formik.handleSubmit}>
                                    <Table responsive borderless>
                                        <tbody>
                                            <tr>
                                                <td className={clsx(styles.table_title, "text-secondary w-25")}>Mật khẩu cũ</td>
                                                <td>
                                                    <input
                                                        name='oldPassword'
                                                        type='password'
                                                        className="form form-control form-control-lg"
                                                        value={formik.values.oldPassword}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {
                                                        formik.errors.oldPassword && formik.touched.oldPassword &&
                                                        <div className={clsx(styles.inValidMessage)}>{formik.errors.oldPassword}</div>
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
                                                        value={formik.values.newPassword}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {
                                                        formik.errors.newPassword && formik.touched.newPassword &&
                                                        <div className={clsx(styles.inValidMessage)}>{formik.errors.newPassword}</div>
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
                                                        value={formik.values.confirmPassword}
                                                        onChange={formik.handleChange}
                                                    />
                                                    {
                                                        formik.errors.confirmPassword && formik.touched.confirmPassword &&
                                                        <div className={clsx(styles.inValidMessage)}>{formik.errors.confirmPassword}</div>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <Button type='submit' size='lg' className={clsx(styles.account_button_update)}>Update</Button>
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
