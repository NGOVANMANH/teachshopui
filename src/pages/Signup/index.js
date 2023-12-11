import clsx from 'clsx';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { useContextData } from '../../hooks';
import { useState, useEffect } from 'react';
import { signup } from '../../services/userServices';

import styles from './Signup.module.scss';

// email
// name
// password
// phone
// gender
// birthday
// address
// ward
// district
// city

const Signup = () => {

    useEffect(() => {
        document.title = "Signup - Techshop";
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const [province, setProvince] = useState([]);

    const { Formik } = formik;

    const { address } = useContextData();


    useEffect(() => {
        if (address) {
            setProvince([...address]);
        }
    }, [address])

    const schema = yup.object().shape({
        email: yup.string().email("Trường này phải là email!").required("Trường này bắt buộc!"),
        name: yup.string().required("Trường này bắt buộc!"),
        phone: yup.string().required("Trường này bắt buộc!"),
        gender: yup.string().required("Trường này bắt buộc!"),
        birthday: yup.string().required("Trường này bắt buộc!"),
        password: yup.string().min(8, "Tối thiểu 8 kí tự").required("Trường này bắt buộc!"),
        confirmPassword: yup.string().min(8, "Tối thiểu 8 kí tự").required("Trường này bắt buộc!").oneOf([yup.ref('password'), null], 'Passwords must match'),
        city: yup.string().required("Vui lòng chọn trường này!"),
        district: yup.string().required("Vui lòng chọn trường này!"),
        ward: yup.string().required("Vui lòng chọn trường này!"),
        address: yup.string().required("Trường này bắt buộc!"),
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={values => {
                console.log(values)

                const fetchApi = async () => {
                    const respone = await signup(values);
                    // handle status;
                }
            }}
            initialValues={{
                email: '',
                name: '',
                phone: '',
                gender: '',
                birthday: '',
                password: '',
                confirmPassword: '',
                city: '',
                district: '',
                ward: '',
                address: '',
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) =>
                <Form noValidate onSubmit={handleSubmit} className='bg-white mt-3 mb-3 rounded'>
                    <Row className='justify-content-center h2 pt-4 pb-1'>Tạo tài khoản khách hàng cá nhân</Row>
                    <Row className='justify-content-center m-2 fs-5'>
                        <Form.Group as={Col} md="4" controlId="validationEmail" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Email đăng kí(*)</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                placeholder="Email..."
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                                isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='justify-content-center m-2 fs-5'>
                        <Form.Group as={Col} md="4" controlId="validationName" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Tên(*)</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                placeholder="Name..."
                                value={values.name}
                                onChange={handleChange}
                                isValid={touched.name && !errors.name}
                                isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationPhone" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Số điện thoại(*)</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone'
                                placeholder="Phone number..."
                                value={values.phone}
                                onChange={handleChange}
                                isValid={touched.phone && !errors.phone}
                                isInvalid={touched.phone && errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationGender" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary fs-5'>Giới tính(*)</Form.Label>
                            <br />
                            <Form.Check
                                className='text-secondary fs-4'
                                name="gender" value={"Nam"}
                                inline label="&nbsp;Nam"
                                type='radio'
                                onChange={handleChange}
                                isValid={touched.gender && !errors.gender}
                                isInvalid={touched.gender && errors.gender} />
                            <Form.Check
                                className='text-secondary fs-4'
                                name="gender" value={"Nữ"}
                                inline label="&nbsp;Nữ"
                                type='radio'
                                onChange={handleChange}
                                isValid={touched.gender && !errors.gender}
                                isInvalid={touched.gender && errors.gender} />
                            <Form.Control.Feedback type="invalid">
                                {errors.gender}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationDateOfBirth" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Ngày sinh(*)</Form.Label>
                            <Form.Control name='birthday' type="date"
                                value={values.birthday}
                                onChange={handleChange}
                                isValid={touched.birthday && !errors.birthday}
                                isInvalid={touched.birthday && errors.birthday}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.birthday}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationPassword" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Mật khẩu(*)</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                placeholder="Password..."
                                value={values.password}
                                onChange={handleChange}
                                isValid={touched.password && !errors.password}
                                isInvalid={touched.password && errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationConfirmedPassword" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Nhập lại mật khẩu(*)</Form.Label>
                            <Form.Control
                                type="password"
                                name='confirmPassword'
                                placeholder="Confirm Password..."
                                value={values.confirmPassword}
                                onChange={handleChange}
                                isValid={touched.confirmPassword && !errors.confirmPassword}
                                isInvalid={touched.confirmPassword && errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationCity" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Tỉnh / Thành phố(*)</Form.Label>
                            <Form.Select
                                name='city'
                                value={values.city}
                                onChange={handleChange}
                                isValid={touched.city && !errors.city}
                                isInvalid={touched.city && errors.city}
                            >
                                <option value="">Chọn tỉnh, thành phố</option>
                                {
                                    province.map(city => <option key={city.code} value={city.name}>{city.name}</option>)
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationDistrict" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Quận / Huyện(*)</Form.Label>
                            <Form.Select
                                name='district'
                                value={values.district}
                                onChange={handleChange}
                                isValid={touched.district && !errors.district}
                                isInvalid={touched.district && errors.district}
                            >
                                <option value="">Chọn quận, huyện</option>
                                {
                                    values.city && values.city.length > 0
                                    &&
                                    province.find(item => item.name === values.city)?.districts.map(item => <option key={item.code} value={item.name}>{item.name}</option>)
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.district}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationWard" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Xã / Phường(*)</Form.Label>
                            <Form.Select
                                name='ward'
                                value={values.ward}
                                onChange={handleChange}
                                isValid={touched.ward && !errors.ward}
                                isInvalid={touched.ward && errors.ward}
                            >
                                <option value="">Chọn xã, phường</option>
                                {
                                    values.district && values.district.length > 0
                                    &&
                                    province.find(item => item.name === values.city)?.districts.find(district => district.name === values.district)?.wards.map(ward => <option key={ward.code} value={ward.name}>{ward.name}</option>)
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.ward}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationAddress" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Địa chỉ(*)</Form.Label>
                            <Form.Control
                                type="text"
                                name='address'
                                placeholder="Address..."
                                value={values.address}
                                onChange={handleChange}
                                isValid={touched.address && !errors.address}
                                isInvalid={touched.address && errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='justify-content-center m-2 fs-5' >
                        <Col className='d-flex justify-content-center m-3'>
                            <Button type="submit" size='lg' className='bg-main' disabled={isLoading}>
                                {isLoading && <Spinner size='sm' />} ĐĂNG KÍ
                            </Button>
                        </Col>
                    </Row>
                </Form>
            }
        </Formik>
    );
}

export default Signup;
