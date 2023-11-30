import { Col, Container, Row, Carousel, Button } from "react-bootstrap";
import { useState } from "react";
import clsx from "clsx";

import { CategoryBlock, HorizontalLine, ProductCarousel } from "../../components";

const ProductDetails = () => {
    const [activeButton, setActiveButton] = useState(1);

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };
    return (
        <Container>
            <Row>
                <Col className={clsx("fs-2")}>Title</Col>
            </Row>
            <HorizontalLine className='mt-3 mb-3' />
            <Row>
                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <div>Product img 1</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 2</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 3</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 4</div>
                        </Carousel.Item>
                    </Carousel>
                    <Carousel>
                        <Carousel.Item>
                            <div>Product img 1</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 2</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 3</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 4</div>
                        </Carousel.Item>
                    </Carousel>
                    <Carousel>
                        <Carousel.Item>
                            <div>Product img 1</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 2</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 3</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 4</div>
                        </Carousel.Item>
                    </Carousel>
                    <Carousel>
                        <Carousel.Item>
                            <div>Product img 1</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 2</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 3</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 4</div>
                        </Carousel.Item>
                    </Carousel>
                    <Carousel>
                        <Carousel.Item>
                            <div>Product img 1</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 2</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 3</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 4</div>
                        </Carousel.Item>
                    </Carousel>
                    <Carousel>
                        <Carousel.Item>
                            <div>Product img 1</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 2</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 3</div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div>Product img 4</div>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col>
                    <Row>
                        <Col md={3}>
                            <Button
                                className={clsx('w-100 fs-3', { active: activeButton === 1 })}
                                variant="outline-secondary"
                                size="lg"
                                onClick={() => handleButtonClick(1)}
                            >
                                Color
                            </Button>
                        </Col>
                        <Col md={3}>
                            <Button
                                className={clsx('w-100 fs-3', { active: activeButton === 2 })}
                                variant="outline-secondary"
                                size="lg"
                                onClick={() => handleButtonClick(2)}
                            >
                                Color
                            </Button>
                        </Col>
                        <Col md={3}>
                            <Button
                                className={clsx('w-100 fs-3', { active: activeButton === 3 })}
                                variant="outline-secondary"
                                size="lg"
                                onClick={() => handleButtonClick(3)}
                            >
                                Color
                            </Button>
                        </Col>
                        <Col md={3}>
                            <Button
                                className={clsx('w-100 fs-3', { active: activeButton === 4 })}
                                variant="outline-secondary"
                                size="lg"
                                onClick={() => handleButtonClick(4)}
                            >
                                Color
                            </Button>
                        </Col>
                    </Row>
                    <HorizontalLine className='mt-3 mb-3' />
                    <Row>
                        <Col>
                            <Button className="w-100 fs-2" variant="secondary" size="lg" >Mua hàng</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <HorizontalLine className='mt-3 mb-3' />            <Row>
                <Col>
                    <CategoryBlock title={"Sản phẩm tương tự"} brands={["Samsung", "apple", "oppo", "redmi"]}>
                        <ProductCarousel className="pt-3 pb-3"></ProductCarousel>
                    </CategoryBlock>
                </Col>
            </Row>
            <HorizontalLine className='mt-3 mb-3' />
            <Row>
                <Col>Comment area</Col>
                <Col>Thông số kĩ thuật</Col>
            </Row>
        </Container>
    )
}

export default ProductDetails;