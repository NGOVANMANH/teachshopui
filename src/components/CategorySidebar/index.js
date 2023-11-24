import { Col, ListGroup, Row, Tab } from 'react-bootstrap';
import CategoryItem from '../CategoryItem';
import clsx from 'clsx';
import styles from './Category.module.scss';

const Category = ({ className }) => {
    return (
        <Tab.Container id="list-group-tabs-example">
            <Row>
                <Col>
                    <ListGroup className={clsx(styles.Category, className)}>
                        <CategoryItem to={"/products"}>Category1</CategoryItem>
                        <CategoryItem to={"/products"}>Category2</CategoryItem>
                        <CategoryItem to={"/products"}>Category3</CategoryItem>
                        <CategoryItem to={"/products"}>Category4</CategoryItem>
                        <CategoryItem to={"/products"}>Category5</CategoryItem>
                        <CategoryItem to={"/products"}>Category6</CategoryItem>
                        <CategoryItem to={"/products"}>Category7</CategoryItem>
                    </ListGroup>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Category;
