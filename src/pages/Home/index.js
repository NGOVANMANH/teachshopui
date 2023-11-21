import { Col, Container, Row } from 'react-bootstrap';
import { Category, Slide, ProductCarousel, CategoryBlock } from '../../components';
import { useEffect, useState } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost/restful_php_api/api/product/show_by_category_brand.php?category=1?&brand=Apple')
      .then(response => {
        if (!response.ok) {
          throw new Error('NOT FOUND PRODUCT');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.product);
      })
  }, [])
  // const products = [
  //   {
  //     name: 'Sản phẩm 1',
  //     image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/8I37NtDffNV7AZlDa7uDvvqhovU.jpg',
  //     description: 'Mô tả sản phẩm 1',
  //   },
  //   {
  //     name: 'Sản phẩm 2',
  //     image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
  //     description: 'Mô tả sản phẩm 2',
  //   },
  //   {
  //     name: 'Sản phẩm 3',
  //     image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
  //     description: 'Mô tả sản phẩm 3',
  //   },
  //   {
  //     name: 'Sản phẩm 4',
  //     image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
  //     description: 'Mô tả sản phẩm 4',
  //   },
  //   {
  //     name: 'Sản phẩm 5',
  //     image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
  //     description: 'Mô tả sản phẩm 5',
  //   },
  //   {
  //     name: 'Sản phẩm 6',
  //     image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
  //     description: 'Mô tả sản phẩm 6',
  //   },
  // ];
  return (
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

      <CategoryBlock category={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <CategoryBlock category={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <CategoryBlock category={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <CategoryBlock category={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

      <CategoryBlock category={"Điện thoại"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      </CategoryBlock>

    </Container>
  );
}

export default Home;
