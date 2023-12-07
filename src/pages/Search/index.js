import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSearchedProduct } from '../../services/productServices';
import { Col, Row, Container, CardGroup, Spinner, Button } from 'react-bootstrap';

import { HorizontalLine, ProductCard } from '../../components';

const SearchResults = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(true);
    const searchValue = params.searchValue.toLocaleLowerCase();

    useEffect(() => {
        const fetchApi = async () => {
            setIsSearching(true);
            const response = await getSearchedProduct(searchValue);

            if (response !== 404) {
                setProducts(response);
            }
            else {
                setProducts([])
            }
            setIsSearching(false);
        }

        fetchApi();

    }, [searchValue])


    return (
        !isSearching
            ?
            <Container>
                <Row>
                    <Container className="mt-3 mb-3 bg-white rounded">
                        <div align="center" className="fs-1 fw-bolder text-secondary text-capitalize">Tìm kiếm: {searchValue}</div>
                    </Container>
                </Row>
                <HorizontalLine className="mt-3 mb-3" />
                <Row>
                    <Col md="auto" className="fs-2 fw-bold text-secondary">Lọc theo:</Col>
                    <Col>
                        <Button style={{ marginRight: "0.5rem" }} variant="outline-secondary" size="lg">{"A-Z"}</Button>
                        <Button style={{ marginRight: "0.5rem" }} variant="outline-secondary" size="lg">{"Z-A"}</Button>
                        <Button style={{ marginRight: "0.5rem" }} variant="outline-secondary" size="lg">{"Cao-Thấp"}</Button>
                        <Button style={{ marginRight: "0.5rem" }} variant="outline-secondary" size="lg">{"Thấp-Cao"}</Button>
                    </Col>
                </Row>
                <HorizontalLine className="mt-3 mb-3" />
                <Row>
                    <CardGroup className="justify-content-center">
                        {
                            products && products.length > 0
                                ?
                                products.map(item => <ProductCard key={item.id} product={item} />)
                                :
                                <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                                    "Tìm thấy 0 sản phẩm"
                                </div>
                        }
                    </CardGroup>
                </Row>
            </Container>
            :
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <Spinner size="lg" />
            </div>
    );
}

export default SearchResults;
