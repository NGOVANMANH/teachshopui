import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from "formik";
import { resetPasswordToken } from '../../services/userServices';
import * as yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { NOT_FOUND } from '../../services/constants';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const location = useLocation();

    const [TOKEN, setTOKEN] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            setTOKEN(token);
        }
    }, [location.search]);

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmedPassword: '',
        },
        onSubmit: values => {
            const fetchResetPassword = async () => {
                setIsLoading(true);
                const response = await resetPasswordToken(values.password, TOKEN);
                if (response !== NOT_FOUND) {
                    toast.success(response.message);
                }
                else {
                    toast.error("Lỗi!")
                }
                setIsLoading(false);
            }
            fetchResetPassword();
        },
        validationSchema: yup.object().shape({
            password: yup.string().required("Is required!").min(8, "Too short!").max(50, 'Too long!'),
            confirmedPassword: yup.string().required("Is required!").min(8, "Too short!").max(50, 'Too long!').oneOf([yup.ref('password'), null], 'Passwords must match'),
        })
    })

    return (
        <div className="container bg-white rounded">
            <div className="d-flex align-items-center justify-content-center" style={{ height: "60rem" }}>
                <form onSubmit={formik.handleSubmit}>
                    <table className="table table-borderless">
                        <thead>
                            <th colSpan={2} className="text-center fs-1 fw-bold">Reset password</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-end">New password</td>
                                <td>
                                    <input type="password" name="password" className="form form-control form-control-lg"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.password && formik.touched && <div className="text-danger">{formik.errors.password}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td className="text-end">Confirm password</td>
                                <td>
                                    <input type="password" name="confirmedPassword" className="form form-control form-control-lg"
                                        value={formik.values.confirmedPassword}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.errors.confirmedPassword && formik.touched && <div className="text-danger">{formik.errors.confirmedPassword}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-secondary" style={{ fontSize: "1.6rem", paddingRight: "1rem", paddingLeft: "1rem" }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Spinner /> : "Gửi"}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
