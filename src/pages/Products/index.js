import { Button, Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { VscFilter } from "react-icons/vsc";
import { MdHistory } from "react-icons/md";

import { HorizontalLine, ProductCard } from "../../components";
import { useContextData } from "../../hooks";
import { getSortProducts, getSortProps } from "../../services/productServices";
import clsx from "clsx";
import styles from './Products.module.scss';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { NOT_FOUND } from "../../services/constants";


const Products = () => {

    useEffect(() => {
        document.title = "Products - Techshop";
    }, [])

    const { products } = useContextData();

    const params = useParams();

    const category = params.category.toLocaleLowerCase();

    const [_products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [productProps, setProductProps] = useState({
        phone: {
            brand: {
                props: [],
                userSelect: [],
            },
            os: {
                props: [],
                userSelect: [],
            },
            ram: {
                props: [],
                userSelect: [],
            },
            rom: {
                props: [],
                userSelect: [],
            },
            charger: {
                props: [],
                userSelect: [],
            },
        },
        cable: {
            brand: {
                props: [],
                userSelect: [],
            },
            input: {
                props: [],
                userSelect: [],
            },
            output: {
                props: [],
                userSelect: [],
            },
            length: {
                props: [],
                userSelect: [],
            },
            charger: {
                props: [],
                userSelect: [],
            }
        },
        backupcharger: {
            brand: {
                props: [],
                userSelect: [],
            },
            capacity: {
                props: [],
                userSelect: [],
            },
            input: {
                props: [],
                userSelect: [],
            },
            output: {
                props: [],
                userSelect: [],
            },
            charger: {
                props: [],
                userSelect: [],
            }
        },
        adapter: {
            brand: {
                props: [],
                userSelect: [],
            },
            numberport: {
                props: [],
                userSelect: [],
            },
            output: {
                props: [],
                userSelect: [],
            },
            charger: {
                props: [],
                userSelect: [],
            }
        }
    });

    const [isGettingProps, setIsGettingProps] = useState(false);

    const [range, setRange] = useState([0, 2000000]);

    const [maxRange, setMaxRange] = useState(0);

    const [isFiltering, setIsFiltering] = useState(false);

    const [isFiltered, setIsFiltered] = useState(false);

    const handleRangeChange = (newRange) => {
        setRange(newRange);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [params])

    useEffect(() => {
        if (products && products.length > 0) {

            let categoryID = -1;

            if (category === "phone") {
                categoryID = 1;
                setMaxRange(100000000);
            }
            else if (category === "adapter") {
                categoryID = 2;
                setMaxRange(10000000);
            }
            else if (category === "cable") {
                categoryID = 3;
                setMaxRange(10000000);
            }
            else if (category === "backupcharger") {
                categoryID = 4;
                setMaxRange(10000000);
            }

            let pTemp = products.filter(item => item.category === categoryID);

            if (params.brand) {
                pTemp = pTemp.filter(item => item.brand === params.brand);
            }

            setRange([0, 1000000]);

            setProducts(pTemp);

            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }, [category, products, params.brand])

    const getTitle = useCallback(() => {
        switch (category) {
            case "phone":
                return "Điện thoại";
            case "cable":
                return "Dây sạc";
            case "backupcharger":
                return "Sạc dự phòng";
            case "adapter":
                return "Củ sạc";
            default: ;
        }
    }, [category]);


    const handleChosseProp = async (key) => {
        if (category) {
            setIsGettingProps(true);
            const res = await getSortProps(category, key);
            if (res.status && res.status === 200) {
                const _props = { ...productProps };
                _props[category][key].props = [...res.data];
                setProductProps(_props);
            }
            setIsGettingProps(false)
        }
    }

    const handleChossePropsToSort = (key, item) => {
        const _props = { ...productProps };
        let userSelect = _props[category][key].userSelect;
        if (!userSelect.includes(item)) {
            _props[category][key].userSelect = [
                ...userSelect,
                item
            ]
        }
        else {
            userSelect = userSelect.filter(us => us !== item);
            _props[category][key].userSelect = [
                ...userSelect
            ]
        }
        setProductProps(_props);
    }

    const handleFilter = async () => {

        if (isFiltered) {
            let categoryID = -1;

            if (category === "phone") {
                categoryID = 1;
            }
            else if (category === "adapter") {
                categoryID = 2;
            }
            else if (category === "cable") {
                categoryID = 3;
            }
            else if (category === "backupcharger") {
                categoryID = 4;
            }
            setProducts(products.filter(item => item.category === categoryID));
            setIsFiltered(false);
            return;
        }

        setIsFiltering(true);

        let data = {};

        Object.keys(productProps[category]).forEach((key) => {
            data[key] = productProps[category][key].userSelect.join("-");
        })

        data = {
            ...data,
            price: range.join("-"),
        }

        const res = await getSortProducts(category, data);
        if (res !== NOT_FOUND) {
            if (res.product) {
                setProducts(res.product);
            }
            else setProducts([]);
        }
        setIsFiltered(true);
        setIsFiltering(false);
    };


    return (
        !isLoading
            ?
            <Container>
                <Row>
                    <Container className="mt-3 mb-3 bg-white rounded">
                        <div align="center" className="fs-1 fw-bolder text-secondary text-capitalize">{getTitle()}</div>
                    </Container>
                </Row>
                <HorizontalLine className="mt-3" />
                <Row>
                    <Col md="auto" className="mt-3">
                        <Button className="fs-4 bg-main" variant="success" onClick={handleFilter}>
                            {
                                isFiltered ? <MdHistory /> :
                                    isFiltering ? <Spinner animation="grow" /> :
                                        <VscFilter />
                            }
                        </Button>
                    </Col>
                    <Col className="mt-3">
                        <Dropdown className="d-inline mx-2" autoClose="outside">
                            <Dropdown.Toggle className="bg-secondary fs-4">
                                price
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ width: "fit-content" }}>
                                <div className={clsx(styles.dropdown_wrapper, "p-4")}>
                                    <label className="fs-3">Từ: <span className="text-success">{range[0].toLocaleString('en-US')} đ - {range[1].toLocaleString('en-US')} đ</span></label>
                                    <Slider
                                        className="text-success"
                                        min={0}
                                        max={maxRange}
                                        step={100000}
                                        range
                                        defaultValue={range}
                                        onChange={handleRangeChange}
                                    />
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        {
                            productProps && productProps[category] &&
                            Object.keys(productProps[category]).map((key, index) =>
                                <Dropdown className="d-inline mx-2" autoClose="outside" key={index} onClick={() => handleChosseProp(key)}>
                                    <Dropdown.Toggle className="bg-secondary fs-4">
                                        {key}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: "fit-content" }}>
                                        <div className={clsx(styles.dropdown_wrapper)}>
                                            {
                                                isGettingProps ? <Spinner animation="grow" variant="secondary" size="lg" /> :
                                                    productProps[category][key].props && productProps[category][key].props.length > 0 &&
                                                    productProps[category][key].props.map((item, index) => (
                                                        <Dropdown.Item
                                                            as={"div"}
                                                            className={clsx(styles.dropdown_item)}
                                                            key={`drop-item-${index}`}
                                                            onClick={() => handleChossePropsToSort(key, item)}
                                                            active={productProps[category][key].userSelect.includes(item)}
                                                        >
                                                            {item}
                                                        </Dropdown.Item>
                                                    ))
                                            }
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                        }
                    </Col>
                </Row>
                <HorizontalLine className="mt-3 mb-3" />
                {_products && _products.length > 0
                    ? <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-4">
                        {
                            _products.map(product => <Col key={product.id}><ProductCard product={product} /></Col>)
                        }
                    </Row> :
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                        "Không có sản phẩm"
                    </div>
                }
            </Container>
            :
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <Spinner size="lg" />
            </div>
    )
}

export default Products;