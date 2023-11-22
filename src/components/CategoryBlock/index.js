import clsx from "clsx";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryBlock = ({ children, category, brands }) => {
    return (
        <Container>
            <Row>
                <Col className={clsx("fs-2 fw-bold")}>{category}</Col>
                <Col md='auto' className={clsx("d-flex align-items-center")}>
                    {
                        brands.map((brand, index) => (
                            <Link key={index} to={'/products'} style={{ marginLeft: "0.5rem" }}>
                                <Button variant="outline-secondary">{brand}</Button>
                            </Link>
                        ))
                    }
                </Col>
            </Row>
            <Row>
                {children}
            </Row>
        </Container>
    );
}

export default CategoryBlock;
