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
                        <CategoryItem to={"/products/phone"}>Điện thoại</CategoryItem>
                        <CategoryItem to={"/products/cable"}>Dây sạc</CategoryItem>
                        <CategoryItem to={"/products/backupcharger"}>Sạc dự phòng</CategoryItem>
                        <CategoryItem to={"/products/adapter"}>Củ sạc</CategoryItem>
                    </ListGroup>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Category;
