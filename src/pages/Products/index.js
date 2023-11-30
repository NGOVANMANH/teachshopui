import { CardGroup, Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";

import { HorizontalLine, ProductCard } from "../../components";
import { getProductByCategory } from '../../services/productServices';

const Products = () => {

    const params = useParams();

    const category = params.category.toLocaleLowerCase();

    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchApi = async () => {
            setIsLoading(true);
            const response = await getProductByCategory(category);

            if (response !== 404) {
                setProducts(response);
            }
            else {
                setProducts([])
            }
            setIsLoading(false);
        }

        fetchApi();
    }, [category])

    const getTitle = useCallback(() => {
        switch (category) {
            case "phone":
                return "Điện thoại";
            case "cable":
                return "Dây sạc";
            case "backupcharger":
                return "Sạc dự phòng";
            case "adapter":
                return "Củ sạc";
            default: ;
        }
    }, [category]);

    return (
        !isLoading
            ?
            products && products.length > 0
                ?
                <Container>
                    <Row>
                        <Col className="fs-2">{getTitle()}</Col>
                    </Row>
                    <HorizontalLine className="mt-3 mb-3" />
                    <Row>
                        <Col>
                            <Link to={'/products'} style={{ marginRight: "0.5rem" }}>
                                <Button variant="outline-secondary">{"wtf"}</Button>
                            </Link>
                        </Col>
                    </Row>
                    <HorizontalLine className="mt-3 mb-3" />
                    <Row>
                        <CardGroup className="justify-content-center">
                            {
                                products.map(product => <ProductCard product={product} />)
                            }
                        </CardGroup>
                    </Row>
                </Container>
                :
                <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                    "0 sản phẩm tồn tại"
                </div>
            :
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <Spinner size="lg" />
            </div>
    )
}

export default Products;