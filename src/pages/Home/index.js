import { Col, Row } from 'react-bootstrap';
import { Category, Slide, ProductCarousel } from '../../components';

const Home = () => {
  const products = [
    {
      name: 'Sản phẩm 1',
      image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/8I37NtDffNV7AZlDa7uDvvqhovU.jpg',
      description: 'Mô tả sản phẩm 1',
    },
    {
      name: 'Sản phẩm 2',
      image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
      description: 'Mô tả sản phẩm 2',
    },
    {
      name: 'Sản phẩm 3',
      image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg',
      description: 'Mô tả sản phẩm 3',
    },
    {
      name: 'Sản phẩm 4',
      image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
      description: 'Mô tả sản phẩm 4',
    },
    {
      name: 'Sản phẩm 5',
      image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
      description: 'Mô tả sản phẩm 5',
    },
    {
      name: 'Sản phẩm 6',
      image: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
      description: 'Mô tả sản phẩm 6',
    },
  ];
  return (
    <div className="Home container mt-3">
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
      <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>
      <ProductCarousel className="pt-3 pb-3" products={products}></ProductCarousel>

    </div>
  );
}

export default Home;
