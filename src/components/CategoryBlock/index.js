import clsx from "clsx";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryBlock = ({ children, title, products, type, isShow }) => {

    const [brands, setBrands] = useState([]);

    const getBrands = (_products) => {
        let brands = [];
        for (let i = 0; i < _products.length; i++) {
            const product = _products[i];
            if (product.hasOwnProperty('brand')) {
                if (!brands.includes(product.brand)) {
                    brands.push(product.brand);
                }
            }
        }
        return brands;
    };

    useEffect(() => {
        if (products) {
            setBrands(getBrands(products));
        }
    }, [products])

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container>
            <Row>
                <Col className={clsx("fs-2 fw-bold")}>{title}</Col>
                {screenWidth >= 1200 && isShow && <Col md='auto' className={clsx("d-flex align-items-center")}>
                    {
                        brands.map((brand, index) => (
                            <Link key={index} to={`/products/${type}/${brand}`} style={{ marginLeft: "0.5rem" }}>
                                <Button variant="outline-secondary">{brand}</Button>
                            </Link>
                        ))
                    }
                </Col>}
            </Row>
            <Row>
                {children}
            </Row>
        </Container>
    );
}

export default CategoryBlock;
