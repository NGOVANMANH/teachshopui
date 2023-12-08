import { Form, Row, Col, Button, Container, Spinner } from 'react-bootstrap';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import styles from '../Signup/Signup.module.scss';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/userServices';
import { useContextData } from '../../hooks';

const Login = () => {

    useEffect(() => {
        document.title = "Login - Techshop";
    }, [])

    const [validated, setValidated] = useState(false);
    const [isLogining, setIsLogining] = useState(false);
    const [userInfor, setUserInfor] = useState({});
    const usenavigate = useNavigate();
    const { setUser } = useContextData();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            const formData = new FormData(form);
            setUserInfor({
                email: formData.get('email'),
                password: formData.get('password')
            });
        }
        setValidated(true);
    };

    useEffect(() => {
        const fetchApi = async () => {
            if (userInfor.email && userInfor.password) {
                setIsLogining(true);
                const response = await login(userInfor);

                if (response !== 404) {
                    if (response.status === 200) {
                        localStorage.setItem("token", response.jwt);
                        setUser({
                            auth: true,
                            userInfor: {
                                ...response.user,
                            }
                        })
                        usenavigate("/");
                    }
                    else {
                        alert(response.message);
                    }
                }

                setIsLogining(false);
            }
        }
        fetchApi();
    }, [userInfor, usenavigate]);


    const toSignup = () => {
        usenavigate('/signup');
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Form className='container bg-white mt-3 mb-3 rounded' noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className='justify-content-center h2 pt-4 pb-1'>Đăng nhập</Row>
                        <Row className='justify-content-center m-2 fs-5'>
                            <Form.Group as={Col} md="6" controlId="validationEmail" className={clsx(styles.form)}>
                                <Form.Label className='text-secondary'>Email đăng kí(*)</Form.Label>
                                <Form.Control
                                    type="Email"
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

                        <Row className="justify-content-center m-2 fs-5">
                            <Form.Group as={Col} md="6" controlId="validationPassword" className={clsx(styles.form)}>
                                <Form.Label className='text-secondary'>Mật khẩu(*)</Form.Label>
                                <Form.Control
                                    type="password"
                                    name='password'
                                    placeholder="Password..."
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a Password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='justify-content-center m-2 fs-5' >
                            <Col className='d-flex justify-content-center m-2'>
                                <Button type="submit" size='lg' className='bg-main'
                                    disabled={isLogining}
                                >
                                    {isLogining ? <Spinner /> : "Đăng nhập"}
                                </Button>
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
                            <Button
                                onClick={toSignup} size='lg' type="submit" className='bg-main'
                            >
                                Đăng kí ngay
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
