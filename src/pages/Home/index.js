import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Category, Slide, ProductCarousel, CategoryBlock } from '../../components';
import { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost/restful_php_api/api/product/show_by_category_brand.php?category=1?&brand=Apple')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProducts(data.product);
        setIsLoading(false);
      })
  }, []);
  return (isLoading
    ?
    <Container className='mt-3' style={{ minHeight: "100vh" }}>
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
    </Container>
    :
    <Container className="Home mt-3">
      <Row>
        <Col sm={2}>
          <Category />
        </Col>

        <Col sm={8}>
          <Row>
            <Slide />
          </Row>
          <Row>
            <Col>Hello</Col>
            <Col>Hello</Col>
            <Col>Hello</Col>
            <Col>Hello</Col>
          </Row>
        </Col>

        <Col sm={2}>
          <Row>
            Hello
          </Row>
          <Row>
            Hello
          </Row>
          <Row>
            Hello
          </Row>
        </Col>
      </Row>

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

    </Container>);
}

export default Home;
