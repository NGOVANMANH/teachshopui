import clsx from "clsx";
import styles from './Footer.module.scss';
import { Col, Container, Row } from "react-bootstrap";
import { TbMailForward } from "react-icons/tb";

const Footer = () => {
    return (
        <div className={clsx("Footer", styles.Footer)}>
            <div className={clsx("bg-main")}>
                <Container>
                    <Row>
                        <Col className={clsx("d-flex flex-row-reverse")}>
                            <TbMailForward />
                        </Col>
                        <Col md="auto">
                            <h2>Nhận thông tin khuyến mãi</h2>
                            <span>Bạn để lại thông tin để nhận thông tin</span>
                            <br />
                            <span> khuyến mãi từ TechShop</span>
                        </Col>
                        <Col>Col3</Col>
                    </Row>
                </Container>
            </div>
            <div className={clsx("bg-white")}>
                <Container>
                    <Row>
                        <Col>
                            Hỗ trợ khách hàng
                        </Col>
                        <Col>
                            Chính sách
                        </Col>
                        <Col>
                            Liên hệ
                        </Col>
                        <Col>
                            Về chúng tôi
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
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
