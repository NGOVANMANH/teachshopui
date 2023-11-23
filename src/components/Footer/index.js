import clsx from "clsx";
import styles from './Footer.module.scss';
import { Col, Container, Row } from "react-bootstrap";
import { TbMailForward } from "react-icons/tb";
import { BsArrowRightCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
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
                            <form className={styles.emailInput}>
                                <input type="email" placeholder='Nhập email đăng ký nhận tin khuyến mãi' />
                                <button className={styles.arrowButtonWrap}><BsArrowRightCircle className={styles.arrowButton} /></button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={clsx("bg-white")}>
                <Container>
                    <Row>
                        <Col>
                            <Container className="mt-3 mb-3">
                                <Row className={clsx(styles.footerTitle)}>Về chúng tôi</Row>
                                <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Địa chỉ</Link></Row>
                                <Row><Link className={clsx(styles.footerLink)} to={"/#"}>0987654321</Link></Row>
                                <Row><Link className={clsx(styles.footerLink)} to={"/#"}>abc@gmail.com</Link></Row>
                            </Container>
                        </Col>
                        <Col>
                            <Container className="mt-3 mb-3">
                                <Row className={clsx(styles.footerTitle)}>Hỗ trợ khách hàng</Row>
                                <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Hướng dẫn mua hàng trực tiếp</Link></Row>
                                <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Hướng dẫn thanh toán</Link></Row>
                                <Row><Link className={clsx(styles.footerLink)} to={"/#"}>Góp ý, khiếu nại</Link></Row>
                            </Container>
                        </Col>
                        <Col>
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
                        <Col>
                            <Container className="mt-3 mb-3">
                                <Row className={clsx(styles.footerTitle)}>Fanpage</Row>
                                <Row><Link className={clsx(styles.footerLink)} to={"/#"}>This is fanpage</Link></Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container style={{ color: "#555", fontSize: "1rem" }}>
                Chủ sở hữu: Hoàng Vĩnh Phúc
                <br />
                Mã số thuế: 8714045794 do Chi cục Thuế Quận Thanh Xuân quản lý - Cấp ngày 07/10/2021
                <br />
                Giấy chứng nhận Đăng ký Kinh doanh số 0109583374 do Sở KHĐT Tp.Hà Nội cấp ngày 07/04/2021
            </Container>
        </div>
    );
}

export default Footer;
