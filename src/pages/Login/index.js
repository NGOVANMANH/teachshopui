import { Form, Row, Col, Button, Container, Spinner } from 'react-bootstrap';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from '../Signup/Signup.module.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({});
    const [isLogining, setIsLogining] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            const formData = new FormData(form);
            setUser({
                email: formData.get('email'),
                password: formData.get('password')
            })
        }
        setValidated(true);
    };

    useEffect(() => {
        const login = async () => {
            if (user && user.email && user.password) {
                setIsLogining(true);
                // try {
                //     const res = await fetch(`http://localhost/restful_php_api/api/customer/login.php`, {
                //         headers: {
                //             'Accept': 'application/json',
                //             'Content-Type': 'application/json'
                //         },
                //         method: "POST",
                //         body: JSON.stringify(user)
                //     });

                //     // Handle the response here
                //     // For example, you can check the response status and perform further actions
                //     if (res.ok) {
                //         const data = await res.json();
                //         console.log('Login success', data);
                //         // Perform actions for successful login
                //     } else {
                //         console.log('Login failed');
                //         // Perform actions for failed login
                //     }
                // } catch (error) {
                //     console.error('Error occurred during login:', error);
                //     // Handle the error here
                // }
                // setIsLogining(false);
                fetch(`http://localhost/restful_php_api/api/customer/login.php`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(user)
                })
                    .then(res => {
                        if (res && res.ok) {
                            return res.json();
                        }
                    })
                    .then(data => {
                        if (data.status === 108) {
                            alert(data.message)
                        }
                        else {
                            usenavigate("/")
                        }
                        setIsLogining(false);
                    })
                    .catch(error => {
                        console.error('Error occurred during login:', error);
                    })
            }
        };

        login();
    }, [user]);

    const usenavigate = useNavigate();
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
