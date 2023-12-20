import { Col, Container, Row, Button, Carousel, Image, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { CategoryBlock, HorizontalLine, ProductCarousel, ProductParameterTable } from "../../components";
import styles from './Product.module.scss';
import { getProductColors, getProductImages } from "../../services/productServices";
import { useContextData } from "../../hooks";
import Comments from "../../components/Comments";

const ProductDetails = () => {

    const { id } = useParams();

    const { products, cart, addToCart } = useContextData();

    const [thisProduct, setThisProduct] = useState({});

    useEffect(() => {

        const thisProduct = [...products].find(item => item.id === +id);
        setThisProduct(thisProduct);

        document.title = `${thisProduct ? thisProduct.name : "Product - Techshop"}`;
    }, [id, products])

    const [productColors, setProductColors] = useState([]);

    const [productImages, setProductImages] = useState([]);

    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        if (thisProduct) {
            const _similarProducts = [...products].filter(item => item.category === thisProduct.category);

            if (_similarProducts) {
                setSimilarProducts(_similarProducts);
            }
        }
    }, [thisProduct, products])

    useEffect(() => {
        const fetchProductColors = async () => {
            const responeColors = await getProductColors(+id);

            if (responeColors.color) {
                setProductColors(responeColors.color)
            }
        }

        const fetchProductImages = async () => {
            const responeImages = await getProductImages(+id);
            if (responeImages.image) {
                setProductImages(responeImages.image);
            }
        }

        fetchProductColors();
        fetchProductImages();
    }, [id])

    const handleAddToCart = () => {
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
                <Row style={{ minHeight: "53rem" }}>
                    <Col md={5}>
                        {
                            productImages && productImages.length > 0 ?
                                <Carousel style={{ height: "100%" }} className="d-flex align-items-center">
                                    {
                                        productImages.map((item, index) => (
                                            <Carousel.Item key={index}>
                                                <Image thumbnail src={`data:image/jpeg;base64, ${item.image}`} alt="img" style={{ width: "100%" }} />
                                            </Carousel.Item>
                                        ))
                                    }
                                </Carousel> :
                                <div className="w-100 h-100 d-flex align-items-center justify-content-center"><Spinner size="lg" /></div>
                        }
                    </Col>
                    <Col className={clsx(styles.product_left)}>
                        <div className={clsx("fs-1 fw-bold", styles.product_left_title)}>
                            {thisProduct ? thisProduct.name : "Product name"}
                            <div className={clsx("fs-3 fw-normal mt-3")}>
                                <ProductParameterTable borderless productID={+id} />
                            </div>
                        </div>
                        <div className={clsx(styles.button_area)}>
                            <Row>
                                {
                                    productColors.length > 0 ?
                                        productColors.map((item, index) =>
                                            <Col md="auto" key={index}>
                                                <Button
                                                    className={clsx('w-100 fs-3 mb-3 mt-3')}
                                                    variant="outline-secondary"
                                                    size="lg"
                                                >
                                                    {item}
                                                </Button>
                                            </Col>
                                        ) :
                                        <div className={clsx('w-100 fs-3 mb-3 mt-3')}><Spinner animation="grow" variant="secondary" /></div>
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
                            <ProductCarousel className="pt-3 pb-3" products={similarProducts.length > 0 ? similarProducts : null}></ProductCarousel>
                        </CategoryBlock>
                    </Col>
                </Row>
            </Container>
            <div className="d-flex">
                <div className="col-md-8">
                    <Col className="bg-white rounded my-shadow p-3" style={{ marginRight: "1rem" }}>
                        <div className={clsx(styles.bottom_title)}>Đánh giá</div>
                        <Comments>

                        </Comments>
                    </Col>
                </div>
                <div className="col">
                    <Col className="bg-white rounded my-shadow p-3">
                        <div className={clsx(styles.bottom_title)}>Thông số kĩ thuật</div>
                        <div className="pt-3">
                            <ProductParameterTable striped borderless productID={+id} />
                        </div>
                    </Col>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;