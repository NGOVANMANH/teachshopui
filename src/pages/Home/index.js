import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Category, Slide, ProductCarousel, CategoryBlock, HorizontalLine } from '../../components';
import { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost/restful_php_api/api/product/show_by_category_brand.php?categoryName=phone&brand=apple')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.product);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
        // Handle the error here
      });
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
        <Col>
          <Slide />
        </Col>
      </Row>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

    </Container>);
}

export default Home;
