import { useFormik } from "formik";
import * as yup from 'yup';

const ResetPassword = () => {

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmedPassword: '',
        },
        onSubmit: values => { console.log(values) },
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
                                    <button type="submit" className="btn btn-secondary" style={{ fontSize: "1.6rem", paddingRight: "1rem", paddingLeft: "1rem" }}>Gửi</button>
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
