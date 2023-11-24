import { CardGroup, Col, Container, Row } from "react-bootstrap";
import { HorizontalLine, ProductCard } from "../../components";
import testProduct from '../../services/testProduct.json';

const Products = () => {
    return (
        <Container>
            <Row>
                <Col>Category1</Col>
            </Row>
            <HorizontalLine />
            <Row>
                <Col>Feature</Col>
            </Row>
            <HorizontalLine />
            <Row>
                <CardGroup className="justify-content-center">
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                    <ProductCard product={testProduct} />
                </CardGroup>
            </Row>
        </Container>
    )
}

export default Products;