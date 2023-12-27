import clsx from "clsx";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryBlock = ({ children, title, products }) => {

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
        // Update the screen width when the window is resized
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Container>
            <Row>
                <Col className={clsx("fs-2 fw-bold")}>{title}</Col>
                {screenWidth >= 1200 && <Col md='auto' className={clsx("d-flex align-items-center")}>
                    {
                        brands.map((brand, index) => (
                            <Link key={index} to={'/#'} style={{ marginLeft: "0.5rem" }}>
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
