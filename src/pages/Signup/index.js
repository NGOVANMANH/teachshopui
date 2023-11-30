import clsx from 'clsx';
import styles from './Signup.module.scss';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const Signup = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        else {
            const formData = new FormData(form);
            console.log(formData.get('email'));
            console.log(formData.get('name'));
            console.log(formData.get('phoneNumber'));
            console.log(formData.get('sex'));
            console.log(formData.get('date'));
            console.log(formData.get('password'));
            console.log(formData.get('confirmedPassword'));
            console.log(formData.get('address'));
        }

        setValidated(true);
    };

    return (
        <Form className='container bg-white mt-3 mb-3 rounded' noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className='justify-content-center h2 pt-4 pb-1'>Tạo tài khoản khách hàng cá nhân</Row>
            <Row className='justify-content-center m-2 fs-5'>
                <Form.Group as={Col} md="4" controlId="validationEmail" className={clsx(styles.form)}>
                    <Form.Label className='text-secondary'>Email đăng kí(*)</Form.Label>
                    <Form.Control
                        type="email"
                        name='email'
                        placeholder="Email..."
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter Email.
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
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter username.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="justify-content-center m-2 fs-5">
                <Form.Group as={Col} md="4" controlId="validationPhoneNumber" className={clsx(styles.form)}>
                    <Form.Label className='text-secondary'>Số điện thoại(*)</Form.Label>
                    <Form.Control
                        type="text"
                        name='phoneNumber'
                        placeholder="Phone number..."
                        required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Phone number.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="justify-content-center m-2 fs-5">
                <Form.Group as={Col} md="4" controlId="validationSex" className={clsx(styles.form)}>
                    <Form.Label className='text-secondary fs-5'>Giới tính</Form.Label>
                    <br />
                    <Form.Check className='text-secondary fs-4' name="sex" value={"Nam"} inline label="&nbsp;Nam" type='radio' />
                    <Form.Check className='text-secondary fs-4' name="sex" value={"Nữ"} inline label="&nbsp;Nữ" type='radio' />
                </Form.Group>
            </Row>
            <Row className="justify-content-center m-2 fs-5">
                <Form.Group as={Col} md="4" controlId="validationDateOfBirth" className={clsx(styles.form)}>
                    <Form.Label className='text-secondary'>Ngày sinh</Form.Label>
                    <Form.Control name='date' type="date" />
                </Form.Group>
            </Row>
            <Row className="justify-content-center m-2 fs-5">
                <Form.Group as={Col} md="4" controlId="validationPassword" className={clsx(styles.form)}>
                    <Form.Label className='text-secondary'>Mật khẩu(*)</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password..." required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Password.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="justify-content-center m-2 fs-5">
                <Form.Group as={Col} md="4" controlId="validationConfirmedPassword" className={clsx(styles.form)}>
                    <Form.Label className='text-secondary'>Nhập lại mật khẩu(*)</Form.Label>
                    <Form.Control type="password" name='confirmedPassword' placeholder="Confirm Password..." required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Password.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="justify-content-center m-2 fs-5">
                <Form.Group as={Col} md="4" controlId="validationAddress" className={clsx(styles.form)}>
                    <Form.Label className='text-secondary'>Địa chỉ(*)</Form.Label>
                    <Form.Control type="text" name='address' placeholder="Address..." required />
                    <Form.Control.Feedback type="invalid">
                        Please provide your Address.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='justify-content-center m-2 fs-5' >
                <Col className='d-flex justify-content-center m-3'>
                    <Button type="submit" size='lg' className='bg-main'>ĐĂNG KÍ</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default Signup;
