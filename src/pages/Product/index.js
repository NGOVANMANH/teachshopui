import { Col, Container, Row, Button, Carousel, Image, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { toast } from 'react-toastify';

import { CategoryBlock, HorizontalLine, ProductCarousel, ProductParameterTable, Comments, Reload } from "../../components";
import styles from './Product.module.scss';
import { useContextData } from "../../hooks";
import { getColorsAndImages } from "../../services/productServices";
import { NOT_FOUND } from "../../services/constants";

const ProductDetails = () => {

    const { id, color } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id, color])

    const { products, addToCart } = useContextData();

    const [thisProduct, setThisProduct] = useState();

    const [productImages, setProductImages] = useState([]);

    const [productColors, setProductColors] = useState([]);

    const [colorPicked, setColorPicked] = useState("");

    const [similarProducts, setSimilarProducts] = useState([]);

    const [productResponse, setProductResponse] = useState();

    const [isLoadingPResponse, setIsLoadingPResponse] = useState(false);

    const [carouselKey, setCarouselKey] = useState(0);

    useEffect(() => {
        setCarouselKey((prev) => prev + 1);
    }, [productImages])

    useEffect(() => {
        if (products && products.length > 0) {
            const thisProduct = [...products].find(item => item.id === +id);
            if (thisProduct) {
                setThisProduct(thisProduct);
                setSimilarProducts([...products].filter(item => item.category === thisProduct.category));
            }
        }

        document.title = `${thisProduct ? thisProduct.name : "Product - Techshop"}`;
    }, [id, products, thisProduct])

    useEffect(() => {
        const fetchColorsAndImages = async () => {
            setIsLoadingPResponse(true);
            const response = await getColorsAndImages(+id);
            if (response !== NOT_FOUND) {
                setProductResponse(response);
                setProductColors(Object.keys(response.color));

                let _color = "";

                if (color) {
                    _color = color;
                } else {
                    _color = Object.keys(response.color)[0];
                }
                setColorPicked(_color);
                setProductImages(response.color[_color].images);
            }
            else toast.error("Lỗi mạng!");
            setIsLoadingPResponse(false);
        }

        fetchColorsAndImages();
    }, [id, color])

    const handleAddToCart = () => {
        if (isLoadingPResponse) return;
        addToCart({
            ...thisProduct,
            color: colorPicked,
            image: productResponse.color[colorPicked].thumbnail[0],
        })
        toast.success("Đã thêm vào giỏ hàng!");
    }

    const handleChosseColor = (event) => {
        const _colorPicked = event.target.value;
        setColorPicked(_colorPicked);
        setProductImages(productResponse.color[_colorPicked].images);
    }

    return (
        <>
            {isLoadingPResponse && <Reload />}
            <Container className="mt-3 mb-3 bg-white p-3 rounded my-shadow">
                <Row style={{ minHeight: "53rem" }}>
                    <Col md={5}>
                        {
                            productImages && productImages.length > 0 ?
                                <Carousel key={carouselKey} style={{ height: "100%" }} interval={null} className="d-flex align-items-center">
                                    {
                                        productImages.map((item, index) => (
                                            <Carousel.Item key={index}>
                                                <Image thumbnail src={`data:image/jpeg;base64, ${item}`} alt="img" style={{ width: "100%" }} />
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
                                {
                                    thisProduct &&
                                    <>
                                        {thisProduct.pre_discount !== 0 && <span className={clsx(styles.prePrice, "text-decoration-line-through text-secondary fs-4")}>{thisProduct.pre_discount.toLocaleString('en-US')} đ</span>}
                                        <br />
                                        <span className={clsx(styles.price, "text-success fs-2 fw-bold")}>{thisProduct.price.toLocaleString('en-US')} đ</span>
                                    </>
                                }
                            </div>
                        </div>
                        <div className={clsx(styles.button_area)}>
                            <Row>
                                {
                                    productColors.length > 0 ?
                                        productColors.map((item, index) =>
                                            <Col xs="auto" key={index}>
                                                <Button
                                                    className={clsx('fs-3 mb-3 mt-3')}
                                                    variant="outline-secondary"
                                                    size="lg"
                                                    value={item}
                                                    active={colorPicked === item}
                                                    onClick={handleChosseColor}
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
                                        disabled={isLoadingPResponse}
                                    >
                                        {isLoadingPResponse ? <Spinner size="lg" /> : "Thêm vào giỏ hàng"}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="bg-white rounded my-shadow mt-3 mb-3 p-3">
                <Row>
                    <Col>
                        <CategoryBlock title={"Sản phẩm tương tự"} products={similarProducts}>
                            <ProductCarousel className="pt-3 pb-3" products={similarProducts.length > 0 ? similarProducts : null}></ProductCarousel>
                        </CategoryBlock>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col sm={12} md={12} lg={12} xl={8} className="bg-white rounded my-shadow p-3">
                        <div className={clsx(styles.bottom_title)}>Đánh giá</div>
                        <Comments data={+id} />
                    </Col>
                    <Col className={clsx("bg-white rounded my-shadow p-3 p-3", styles.reponsive)}>
                        <div className={clsx(styles.bottom_title)}>Thông số kĩ thuật</div>
                        <div className="pt-3">
                            <ProductParameterTable striped borderless productID={+id} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductDetails;