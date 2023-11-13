import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
    return (
        <div className="Home">

            <Row>

                <Col sm={2}>
                    <Tab.Container id="list-group-tabs-example">
                        <Row>
                            <Col>
                                <ListGroup>
                                    <ListGroup.Item action href="#link1">
                                        Link 1
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link2">
                                        Link 2
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link3">
                                        Link 3
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link4">
                                        Link 4
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link5">
                                        Link 5
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link6">
                                        Link 6
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link7">
                                        Link 7
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            {/* <Col sm={8}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#link1">Tab pane content 1</Tab.Pane>
                                    <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
                                </Tab.Content>
                            </Col> */}
                        </Row>
                    </Tab.Container>
                </Col>

                <Col sm={8}>
                    <Carousel>
                        <Carousel.Item interval={1000}>
                            <img src="" alt="slide 1" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={500}>
                            <img src="" alt="slide 2" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="" alt="slide 3" />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>

                <Col sm={2}>

                </Col>
            </Row>

        </div>
    );
}

export default Home;
