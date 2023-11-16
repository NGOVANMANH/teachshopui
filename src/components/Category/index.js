import { Col, ListGroup, Row, Tab } from 'react-bootstrap';
import CategoryItem from '../CategoryItem';
import clsx from 'clsx';
import styles from './Category.module.scss';

const Category = () => {
    return (
        <Tab.Container id="list-group-tabs-example">
            <Row>
                <Col>
                    <ListGroup className={clsx(styles.Category)}>
                        <CategoryItem href={"/#manh1"}>Category1</CategoryItem>
                        <CategoryItem href={"/#manh2"}>Category2</CategoryItem>
                        <CategoryItem href={"/#manh3"}>Category3</CategoryItem>
                        <CategoryItem href={"/#manh4"}>Category4</CategoryItem>
                        <CategoryItem href={"/#manh5"}>Category5</CategoryItem>
                        <CategoryItem href={"/#manh6"}>Category6</CategoryItem>
                        <CategoryItem href={"/#manh7"}>Category7</CategoryItem>
                    </ListGroup>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Category;
