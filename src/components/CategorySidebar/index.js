import { useState, useEffect } from 'react';
import { Col, Container, ListGroup, Row, Tab } from 'react-bootstrap';
import CategoryItem from '../CategoryItem';
import clsx from 'clsx';
import styles from './Category.module.scss';

const Category = ({ className }) => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Update the screen width when the window is resized
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        screenWidth >= 768 ?
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
            </Tab.Container> :
            <Container className='mb-3'>
                <Row>
                    <Col>
                        <CategoryItem isMobile to={"/products/phone"}>Điện thoại</CategoryItem>
                    </Col>
                    <Col>
                        <CategoryItem isMobile to={"/products/cable"}>Dây sạc</CategoryItem>
                    </Col>
                    <Col>
                        <CategoryItem isMobile to={"/products/backupcharger"}>Sạc dự phòng</CategoryItem>
                    </Col>
                    <Col>
                        <CategoryItem isMobile to={"/products/adapter"}>Củ sạc</CategoryItem>
                    </Col>
                </Row>
            </Container>
    );
}

export default Category;
