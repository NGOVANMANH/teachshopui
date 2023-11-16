import { Form, Row, Col, Button } from 'react-bootstrap';
import clsx from 'clsx';
import { useState } from 'react';
import styles from '../Signup/Signup.module.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const usenavigate = useNavigate();
    const toSignup = () => {
        usenavigate('/signup');
    }
    return (
        <Row>
            <Col>
                <Form className='container bg-white mt-3 mb-3 rounded' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className='justify-content-center h2 pt-4 pb-1'>Đăng nhập</Row>
                    <Row className='justify-content-center m-2 fs-5'>
                        <Form.Group as={Col} md="4" controlId="validationEmail" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Email đăng kí(*)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email..."
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter Email.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="justify-content-center m-2 fs-5">
                        <Form.Group as={Col} md="4" controlId="validationPassword" className={clsx(styles.form)}>
                            <Form.Label className='text-secondary'>Mật khẩu(*)</Form.Label>
                            <Form.Control type="password" placeholder="Password..." required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a Password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className='justify-content-center m-2 fs-5' >
                        <Col className='d-flex justify-content-center m-2'>
                            <Button type="submit" className='bg-main'>Đăng nhập</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>

            <Col className='container bg-white mt-3 mb-3 rounded'>
                <Row className='justify-content-center h2 pt-4 pb-1'>Chưa có tài khoản</Row>
                <Row className='justify-content-center m-2 fs-5' >
                    <Col>
                        Đăng ký là thành viên để hưởng nhiều lợi ích và đặt mua hàng dễ dàng hơn.
                    </Col>
                    <Col className='d-flex justify-content-center m-2'>
                        <Button onClick={toSignup} type="submit" className='bg-main'>Đăng kí ngay</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Login;
