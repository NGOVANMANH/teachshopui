import { Card, Placeholder } from "react-bootstrap";

const LoadingCard = () => {
    return (
        <Card style={{ width: '18rem', height: "25rem" }} className="my-shadow rounded">
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={10} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={10} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={10} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
    );
}

export default LoadingCard;
