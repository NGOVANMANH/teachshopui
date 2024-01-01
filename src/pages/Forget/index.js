import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import clsx from "clsx";

import styles from './Forget.module.scss';
import { resetPassword } from "../../services/userServices";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const Forgot = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        document.title = "Quên mật khẩu";
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            const fetchApi = async () => {
                setIsLoading(true);
                const res = await resetPassword(values.email);
                toast(res.message);
                setIsLoading(false);
            }

            fetchApi();
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Trường này phải là email!").required("Trường này bắt buộc!"),
        })
    });

    return (
        <div className={clsx("container bg-white rounded p-5 mt-3 mb-3", styles.content)}>
            <h2>Bạn quên mật khẩu vào tài khoản?</h2>
            <p>Vui lòng nhập địa chỉ email đã đăng ký với chúng tôi để tạo mật khẩu mới. Chúng tôi sẽ gửi 1 email vào địa chỉ email cung cấp và yêu cầu xác minh trước khi có thể tạo mật khẩu mới</p>
            <form onSubmit={formik.handleSubmit}>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="w-25">
                                <label htmlFor="email">Nhập địa chỉ email đăng ký</label>
                            </td>
                            <td>
                                <input className="form form-control form-control-lg fs-3" name="email" onChange={formik.handleChange} value={formik.values.email} />
                                {
                                    formik.errors.email && formik.touched.email && <div className="fs-5 text-danger">{formik.errors.email}</div>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit" className="btn btn-primary btn-lg bg-main"
                                >
                                    {isLoading ? <Spinner /> : "Lấy mật khẩu"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Forgot;
