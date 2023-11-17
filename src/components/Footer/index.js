import clsx from "clsx";
import styles from './Footer.module.scss';
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <div className={clsx("Footer", styles.Footer)}>
            <div className={clsx("bg-main")}>
                <Container>
                    <Row>
                        <Col className={clsx("d-flex flex-row-reverse")}>Col1</Col>
                        <Col>Col2</Col>
                    </Row>
                </Container>
            </div>
            <div className={clsx("bg-white")}>
                <Container>
                    <Row>
                        <Col>
                            col1
                        </Col>
                        <Col>
                            col2
                        </Col>
                        <Col>
                            col3
                        </Col>
                        <Col>
                            col4
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                hello
            </Container>
        </div>
    );
}

export default Footer;
