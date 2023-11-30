import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSearchedProduct } from '../../services/productServices';
import { Col, Row, Container, CardGroup, Spinner } from 'react-bootstrap';
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
                    <Col>Kết quả tìm kiếm: {searchValue}</Col>
                </Row>
                <HorizontalLine />
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
