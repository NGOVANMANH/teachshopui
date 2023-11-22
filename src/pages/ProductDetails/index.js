import { Col, Container, Row, Carousel } from "react-bootstrap";
import { HorizontalLine } from "../../components";
import clsx from "clsx";

const ProductDetails = () => {
    return (
        <Container>
            <Row>
                <Col className={clsx("fs-2 fw-bold")}>Title</Col>
            </Row>
            <HorizontalLine />
            <Row>
                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <div>Hello</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Hello</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Hello</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Hello</div>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col>Chỉ số mua</Col>
            </Row>
            <HorizontalLine />
            <Row>
                <Col>
                    Khu vuc de xuat
                </Col>
            </Row>
            <HorizontalLine />
            <Row>
                <Col>Comment area</Col>
                <Col>Thông số kĩ thuật</Col>
            </Row>
        </Container>
    )
}

export default ProductDetails;