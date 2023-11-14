import { Col, ListGroup, Row, Tab } from 'react-bootstrap';

const Category = () => {
    return (
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
    );
}

export default Category;
