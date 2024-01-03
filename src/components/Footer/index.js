import clsx from "clsx";
import { useState, useEffect } from "react";
import styles from './Footer.module.scss';
import { Col, Container, Row } from "react-bootstrap";
import { TbMailForward } from "react-icons/tb";
import { BsArrowRightCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { validateEmail } from '../../hooks';
import { IoIosArrowBack } from "react-icons/io";
import { Toggle } from '../../components';
import { toast } from "react-toastify";

const Footer = () => {
    const handldleSentEmail = (e) => {
        let element = e.target.parentElement;
        while (element.nodeName !== 'FORM') {
            element = element.parentElement;
        }
        const inputElement = element.querySelector('input');
        if (inputElement.value && inputElement.value.length !== 0 && validateEmail(inputElement.value)) {
            console.log(inputElement.value);
        }
        else {
            toast("Vui lòng nhập email...!")
        }
    }


    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Update the screen width when the window is resized
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        screenWidth < 992 ?
            <>
                <div className="bg-main">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs="auto" className={clsx("d-flex flex-row-reverse align-items-center")}>
                                <TbMailForward className={clsx(styles.mailIcon)} />
                            </Col>
                            <Col xs="auto" className="text-white">
                                <div className="pt-3 pb-3">
                                    <span className="fs-2 fw-bold">Nhận thông tin khuyến mãi</span>
                                    <br />
                                    <span className="fs-5 font-weight-light">Bạn để lại thông tin để nhận thông tin <br />khuyến mãi từ TechShop</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center mb-3">
                                <form action="#" className={styles.emailInput}>
                                    <input type="email" placeholder='Nhập email đăng ký nhận tin khuyến mãi' />
                                    <button type="button" onClick={handldleSentEmail} className={styles.arrowButtonWrap}><BsArrowRightCircle className={styles.arrowButton} /></button>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="bg-white pt-3 pb-3">
                    <Container>
                        <Toggle
                            parent={<div className={clsx(styles.footerTitle, styles.footerTitleMobile)}>Về chúng tôi<IoIosArrowBack /></div>}
                            children={<Row>
                                <Col>
                                    <Container className="mt-1 mb-3">
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Địa chỉ</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>0987654321</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>abc@gmail.com</Link></Row>
                                    </Container>
                                </Col>
                            </Row>}
                        />
                        <Toggle
                            parent={<div className={clsx(styles.footerTitle, styles.footerTitleMobile)}>Hỗ trợ khách hàng<IoIosArrowBack /></div>}
                            children={<Row>
                                <Col>
                                    <Container className="mt-1 mb-3">
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Hướng dẫn mua hàng trực tiếp</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Hướng dẫn thanh toán</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Góp ý, khiếu nại</Link></Row>
                                    </Container>
                                </Col>
                            </Row>}
                        />
                        <Toggle
                            parent={<div className={clsx(styles.footerTitle, styles.footerTitleMobile)}>Chính sách<IoIosArrowBack /></div>}
                            children={<Row>
                                <Col>
                                    <Container className="mt-1 mb-3">
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách, quy định chung</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách vận chuyển</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách bảo hành</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách đổi trả và hoàn tiền</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách xử lý khiếu nại</Link></Row>
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Bảo mật thông tin khách hàng</Link></Row>
                                    </Container>
                                </Col>
                            </Row>}
                        />
                        <Toggle
                            parent={<div className={clsx(styles.footerTitle, styles.footerTitleMobile)}>Fanpage<IoIosArrowBack /></div>}
                            children={<Row>
                                <Col>
                                    <Container className="mt-1 mb-3">
                                        <Row><Link className={clsx(styles.footerLink)} to={"/#"}>This is fanpage</Link></Row>
                                    </Container>
                                </Col>
                            </Row>}
                        />
                    </Container>
                </div>
                <Container className="pt-3 pb-3" style={{ color: "#555", fontSize: "1.1rem" }}>
                    Chủ sở hữu: Hoàng Vĩnh Phúc
                    <br />
                    Mã số thuế: 8714045794 do Chi cục Thuế Quận Thanh Xuân quản lý - Cấp ngày 07/10/2021
                    <br />
                    Giấy chứng nhận Đăng ký Kinh doanh số 0109583374 do Sở KHĐT Tp.Hà Nội cấp ngày 07/04/2021
                </Container>
            </> :
            <div className={clsx("Footer", styles.Footer)}>
                <div className={clsx("bg-main")}>
                    <Container>
                        <Row>
                            <Col md={3} className={clsx("d-flex flex-row-reverse align-items-center")}>
                                <TbMailForward className={clsx(styles.mailIcon)} />
                            </Col>
                            <Col md="auto" className="text-white">
                                <div className="pt-3 pb-3">
                                    <span className="fs-2 fw-bold">Nhận thông tin khuyến mãi</span>
                                    <br />
                                    <span className="fs-5 font-weight-light">Bạn để lại thông tin để nhận thông tin <br />khuyến mãi từ TechShop</span>
                                </div>
                            </Col>
                            <Col className="d-flex align-items-center">
                                <form action="#" className={styles.emailInput}>
                                    <input type="email" placeholder='Nhập email đăng ký nhận tin khuyến mãi' />
                                    <button type="button" onClick={handldleSentEmail} className={styles.arrowButtonWrap}><BsArrowRightCircle className={styles.arrowButton} /></button>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={clsx("bg-white")}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="auto">
                                <Container className="mt-3 mb-3">
                                    <Row className={clsx(styles.footerTitle)}>Về chúng tôi</Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Địa chỉ</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>0987654321</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>abc@gmail.com</Link></Row>
                                </Container>
                            </Col>
                            <Col md="auto">
                                <Container className="mt-3 mb-3">
                                    <Row className={clsx(styles.footerTitle)}>Hỗ trợ khách hàng</Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Hướng dẫn mua hàng trực tiếp</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Hướng dẫn thanh toán</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Góp ý, khiếu nại</Link></Row>
                                </Container>
                            </Col>
                            <Col md="auto">
                                <Container className="mt-3 mb-3">
                                    <Row className={clsx(styles.footerTitle)}>Chính sách</Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách, quy định chung</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách vận chuyển</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách bảo hành</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách đổi trả và hoàn tiền</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Chính sách xử lý khiếu nại</Link></Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Bảo mật thông tin khách hàng</Link></Row>
                                </Container>
                            </Col>
                            <Col md="auto">
                                <Container className="mt-3 mb-3">
                                    <Row className={clsx(styles.footerTitle)}>Fanpage</Row>
                                    <Row><Link className={clsx(styles.footerLink)} to={"/#"}>This is fanpage</Link></Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className="pt-3 pb-3" style={{ color: "#555", fontSize: "1.1rem" }}>
                    Chủ sở hữu: Ngô Văn Mạnh
                    <br />
                    Mã số thuế: 0987654321 do Chi cục Thuế Quận 9 quản lý - Cấp ngày 07/10/2023
                    <br />
                    Giấy chứng nhận Đăng ký Kinh doanh số 123123123 do Sở KHĐT Tp.Hồ Chí Minh cấp ngày 01/01/2025
                </Container>
            </div>
    );
}

export default Footer;
