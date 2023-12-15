import { Col, Container, Row, Button, Carousel, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { CategoryBlock, HorizontalLine, ProductCarousel, Comment, ProductParameterTable } from "../../components";
import testProduct from '../../services/testProduct.json';
import styles from './Product.module.scss';
import { getProductColors, getProductParameters } from "../../services/productServices";
import { useContextData } from "../../hooks";

const ProductDetails = () => {

    useEffect(() => {
        document.title = "Product - Techshop";
    }, [])

    const { products, cart, addToCart } = useContextData();

    const [productColors, setProductColors] = useState([]);

    // const [productParameters, setProductParameters] = useState([]);

    const { id } = useParams();

    console.log(+id)

    useEffect(() => {
        const fetchApi = async () => {
            const responeColors = await getProductColors(+id);
            const responeParams = await getProductParameters(+id);

            console.log(">>>>> check response Params", responeParams)

            if (responeColors.color) {
                setProductColors(responeColors.color)
            }
        }

        fetchApi();
    }, [id])

    const handleAddToCart = () => {
        const thisProduct = [...products].find(product => product.id === +id);
        const productInCart = [...cart].find(product => product.id === +id);

        if (thisProduct && !productInCart) {
            addToCart(thisProduct);
        }
        else {
            alert("Sản phẩm đã có trong giỏ hàng!")
        }
    }

    return (
        <>
            <Container className="mt-3 mb-3 bg-white p-3 rounded my-shadow">
                <Row>
                    <Col md={5}>
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
                    <Col className={clsx(styles.product_left, "p-5")}>
                        <Row>
                            <Col className="fs-1 fw-bold">
                                {testProduct.name}
                            </Col>
                        </Row>
                        <div className={clsx(styles.button_area)}>
                            <Row>
                                {
                                    productColors.length > 0 &&
                                    productColors.map((item, index) =>
                                        <Col md="auto" key={index}>
                                            <Button
                                                className={clsx('w-100 fs-3 mb-3')}
                                                variant="outline-secondary"
                                                size="lg"
                                            >
                                                {item}
                                            </Button>
                                        </Col>
                                    )
                                }
                            </Row>
                            <HorizontalLine className='mb-3' />
                            <Row>
                                <Col>
                                    <Button className="w-100 fs-2" variant="secondary" size="lg"
                                        onClick={handleAddToCart}
                                    >
                                        Thêm vào giỏ hàng</Button>
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
                            <ProductParameterTable />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductDetails;