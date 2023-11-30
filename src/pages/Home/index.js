import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Category, Slide, ProductCarousel, CategoryBlock, HorizontalLine } from '../../components';
import { useEffect, useState } from 'react';
import { getProductByCategory } from '../../services/productServices';

const Home = () => {
  const [phones, setPhones] = useState([]);
  const [cables, setCables] = useState([]);
  const [backupchargers, setBackupchargers] = useState([]);
  const [adapters, setAdapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    fetchApi("phone");
    fetchApi("cable");
    fetchApi("backupcharger");
    fetchApi("adapter");

  }, []);

  const fetchApi = async (category) => {
    const res = await getProductByCategory(category)
    if (res !== 404) {
      switch (category) {
        case "phone":
          setPhones(res);
          break;
        case "cable":
          setCables(res);
          break;
        case "backupcharger":
          setBackupchargers(res);
          break;
        case "adapter":
          setAdapters(res);
          break;
        default: ;
      }
      setIsLoading(false);
    }
  }

  return (isLoading
    ?
    <Container className='mt-3'>
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
        <ProductCarousel className="pt-3 pb-3" products={phones}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Dây sạc"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={cables}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Sạc dự phòng"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={backupchargers}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

      <CategoryBlock title={"Củ sạc"} brands={["Samsung", "apple", "oppo", "redmi"]}>
        <ProductCarousel className="pt-3 pb-3" products={adapters}></ProductCarousel>
      </CategoryBlock>

      <HorizontalLine className="mt-3 mb-3" />

    </Container>);
}

export default Home;
