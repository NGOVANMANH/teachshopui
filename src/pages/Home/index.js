import { Col, Row } from 'react-bootstrap';
import { Category, Slide } from '../../components';

const Home = () => {
  return (
    <div className="Home container mt-3 mb-3">
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
      <Row>

      </Row>
    </div>
  );
}

export default Home;
