import { Col, Container, Row, Button, Carousel, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import clsx from "clsx";

import { CategoryBlock, HorizontalLine, ProductCarousel, Comment, ProductParameterTable } from "../../components";
import testProduct from '../../services/testProduct.json';
import styles from './Product.module.scss';

const ProductDetails = () => {

    useEffect(() => {
        document.title = "Product - Techshop";
    }, [])

    const [activeButton, setActiveButton] = useState(1);
    // const params = useParams();

    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };
    return (
        <>
            <Container className="mt-3 mb-3 bg-white p-3 rounded my-shadow">
                <Row>
                    <Col>
                        <Carousel>
                            <Carousel.Item>
                                <Image thumbnail src={`data:image/jpeg;base64, ${testProduct.image}`} alt="img" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image thumbnail src={`data:image/jpeg;base64, ${testProduct.image}`} alt="img" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image thumbnail src={`data:image/jpeg;base64, ${testProduct.image}`} alt="img" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image thumbnail src={`data:image/jpeg;base64, ${testProduct.image}`} alt="img" />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col className={clsx(styles.product_left)}>
                        <Row>
                            <Col className="fs-1">
                                {testProduct.name}
                            </Col>
                        </Row>
                        <div className={clsx(styles.button_area)}>
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
                                    <Button className="w-100 fs-2" variant="secondary" size="lg" >Thêm vào giỏ hàng</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="bg-white rounded my-shadow mt-3 mb-3 p-3">
                <Row>
                    <Col>
                        <CategoryBlock title={"Sản phẩm tương tự"} brands={["Samsung", "apple", "oppo", "redmi"]}>
                            <ProductCarousel className="pt-3 pb-3"></ProductCarousel>
                        </CategoryBlock>
                    </Col>
                </Row>
            </Container>
            <Container className="mb-3">
                <Row>
                    <Col md={7} className="bg-white rounded my-shadow p-3" style={{ marginRight: "0.5rem" }}>
                        <div className={clsx(styles.bottom_title)}>Đánh giá</div>
                        <div className={clsx(styles.comment_area)}>
                            {
                                [1, 2, 3, 4, 5, 6].map((item, index) => <Comment key={index} />)
                            }
                        </div>
                    </Col>
                    <Col className="bg-white rounded my-shadow p-3" style={{ marginLeft: "0.5rem" }}>
                        <div className={clsx(styles.bottom_title)}>Thông số kĩ thuật</div>
                        <div>
                            <ProductParameterTable></ProductParameterTable>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductDetails;