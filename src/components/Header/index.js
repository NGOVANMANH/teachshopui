import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { HiOutlineMapPin } from 'react-icons/hi2';
import { TfiHeadphone } from 'react-icons/tfi';
import { HiOutlineSpeakerphone, HiMenu } from 'react-icons/hi';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineThunderbolt, AiOutlineShoppingCart } from 'react-icons/ai';
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContextData, useDebounce } from '../../hooks'
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { getSearchedProduct } from '../../services/productServices';
import logo from '../../assets/images/logo.svg';
import styles from './Header.module.scss';
import Category from "../CategorySidebar";
import PopperWrapper from "../PopperWrapper";
import SearchProductItem from "../SearchProductItem";
import { NOT_FOUND } from "../../services/constants";
import CartHover from "../CartHover";

const Header = () => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false);
    const [cartNum, setCartNum] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const { user, setUser, cart } = useContextData();

    useEffect(() => {
        if (cart) {
            const _cartNum = cart.reduce((total, item) => total + item.quantity, 0);
            setCartNum(_cartNum);
        }
    }, [cart])

    const showCategory = () => {
        setIsShow(!isShow);
    }

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetchApi = async () => {

            if (!debouncedValue.trim()) {
                setSearchResult([]);
                return;
            }

            const data = await getSearchedProduct(debouncedValue);

            if (data === NOT_FOUND) {
                setSearchResult([]);
            }
            else
                setSearchResult(data);
        };

        fetchApi();

    }, [debouncedValue]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClickedSearch = () => {
        if (searchValue) {
            navigate(`/search/${searchValue}`);
        }
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleClickedSearch();
            setShowResult(false);
        }
    }

    const toProfile = () => {
        navigate("/profile");
    }

    const toProfileActive = () => {
        navigate("/profile/0");
    }

    const handleLogout = () => {
        setUser({
            auth: false,
            userInfor: {},
        })
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className={clsx("Header", styles.Header, "position-sticky top-0")}>
            <div className={clsx("Header-1", "bg-main")}>
                <div className={clsx("container")}>

                    <div className="row">

                        <div className={clsx("col-md-auto m-1", styles.centerY)}>
                            <div className="row">
                                <div className={clsx("col-md-auto", styles.box)}>
                                    <HiOutlineMapPin className={clsx(styles.boxIcon)} />
                                    Địa chỉ liên hệ
                                </div>
                                <div className={clsx("col-md-auto", styles.box)}>
                                    <TfiHeadphone className={clsx(styles.boxIcon)} />
                                    Hotline trực tuyến
                                </div>
                            </div>
                        </div>

                        <div className={clsx("col-md-auto", styles.centerY)}>
                            <div className="row">
                                <div className={clsx("col", styles.socialMedia)}>
                                    <a href="null" target='_blank'>Shopee</a>
                                </div>
                                <div className={clsx("col", styles.socialMedia)}>
                                    <a href="null" target='_blank'>Lazada</a>
                                </div>
                                <div className={clsx("col", styles.socialMedia)}>
                                    <a href="null" target='_blank'>Instagram</a>
                                </div>
                                <div className={clsx("col", styles.socialMedia)}>
                                    <a href="null" target='_blank'>Tiktok</a>
                                </div>
                                <div className={clsx("col", styles.socialMedia)}>
                                    <a href="null" target='_blank'>Youtube</a>
                                </div>
                                <div className={clsx("col", styles.socialMedia)}>
                                    <a href="null" target='_blank'>Facebook</a>
                                </div>
                            </div>
                        </div>

                        <div className="col d-flex justify-content-end align-items-center">
                            <div className={clsx(styles.userDiv)}>
                                <HiOutlineSpeakerphone className={clsx(styles.userDivIcon)} />
                                <Link to="/news">Tin tức</Link>
                            </div>
                            <div className={clsx(styles.userDiv)}>
                                <FaUserCircle className={clsx(styles.userDivIcon)} />
                                {
                                    user && user.auth
                                        ?
                                        <>
                                            <div className="text-capitalize">Hello! {user.userInfor.name ? user.userInfor.name : "user"} nhé!</div>
                                            <DropdownButton className={clsx(styles.dropDownUser)} id="dropdown-basic-button" title="" align={"end"}>
                                                <Dropdown.Item className={clsx(styles.dropDownUserItem)} onClick={toProfile}>Xem thông tin</Dropdown.Item>
                                                <Dropdown.Item className={clsx(styles.dropDownUserItem)} onClick={toProfileActive}>Tình trạng đơn hàng</Dropdown.Item>
                                                <Dropdown.Item className={clsx(styles.dropDownUserItem)} onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                                            </DropdownButton>
                                        </>
                                        :
                                        <>
                                            <Link to="/login">Đăng nhập</Link>
                                            <span>&nbsp;/&nbsp;</span>
                                            <Link to="/signup">Đăng kí</Link>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx("bg-white")}>
                <div className={clsx("Header-2", "container")}>
                    <div className="row">

                        <Tippy content="Back to home" placement="bottom">
                            <div className={clsx("col-md-auto")}>
                                <Link to="/"><img src={logo} alt="logo" className={clsx(styles.logo)} /></Link>
                            </div>
                        </Tippy>

                        <div className={clsx("col", styles.centerY)}>
                            <Tippy content="Danh mục" placement="bottom">
                                <Button onClick={showCategory} className={clsx("bg-main d-flex justify-content-center align-items-center", styles.categoryButton)}><HiMenu /><span>DANH MỤC</span></Button>
                            </Tippy>
                        </div>
                        <div className={clsx("col", styles.centerY)}>
                            <TippyHeadless
                                interactive
                                content="Search result"
                                placement="bottom"
                                visible={showResult && searchResult.length > 0}
                                render={attrs => (
                                    <PopperWrapper {...attrs}>
                                        {searchResult.map(product => (
                                            <SearchProductItem key={product.id} product={product} />
                                        ))}
                                    </PopperWrapper>
                                )}
                                onClickOutside={handleHideResult}
                            >
                                <div className={clsx("input-group", styles.search)}>
                                    <input
                                        onFocus={() => setShowResult(true)}
                                        onChange={handleChange} type="search"
                                        className={clsx("form-control rounded")}
                                        placeholder="Search" aria-label="Search"
                                        aria-describedby="search-addon"
                                        spellCheck={false}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <Tippy
                                        content="Tìm kiếm"
                                        placement="bottom"
                                    >
                                        <button
                                            onClick={handleClickedSearch}
                                            type="button"
                                            className={clsx("btn btn-outline-primary bg-main")}
                                        >
                                            <FaSearch className="text-white" />
                                        </button>
                                    </Tippy>
                                </div>
                            </TippyHeadless>
                        </div>

                        <div className={clsx("col-md-auto d-flex justify-content-center align-items-center")}>
                            <div className="row">
                                <div className={clsx("col-md-auto", styles.centerY, styles.helpCenter)}>
                                    <BiPhoneCall className={clsx(styles.icon, styles.ring)} />
                                    <a href="/" target='_blank'>
                                        <span>Hotline</span>
                                        <br />
                                        <b>0349.296.461</b>
                                    </a>
                                </div>
                                <div className={clsx("col-md-auto", styles.centerY, styles.helpCenter)}>
                                    <div className="vr text-success"></div>
                                    <AiOutlineThunderbolt className={clsx(styles.icon)} />
                                    <a href="/" target='_blank'>
                                        <span>Tư vấn trực tiếp</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={clsx("col-md-auto d-flex justify-content-center align-items-center")}>
                            <TippyHeadless
                                interactive
                                placement="bottom-end"
                                render={attrs => (
                                    <PopperWrapper className="position-relative">
                                        <div className={clsx(styles.cart_hover_title)}>Giỏ hàng</div>
                                        <CartHover />
                                        <div className="mb-5"></div>
                                        <div className="mb-5"></div>
                                        <div className="my-shadow d-flex position-absolute bottom-0 w-100 rounded p-2">
                                            <Button className={clsx(styles.cart_hover_button)}>
                                                Thanh toán ngay
                                                {
                                                    cart.length > 0 && <>{` (${cart.length}) sản phẩm`}</>
                                                }
                                            </Button>
                                        </div>
                                    </PopperWrapper>
                                )}
                            >
                                <Button
                                    onClick={() => { navigate('/cart') }}
                                    variant="outline-success"
                                    className={clsx("d-flex justify-content-center align-items-center", styles.categoryButton)}>
                                    <div className="position-relative">
                                        <AiOutlineShoppingCart />
                                        {cart && cart.length > 0 && <div className={clsx("position-absolute", styles.numOfCartItemBox)}>
                                            {cartNum}
                                        </div>}
                                    </div>
                                    &nbsp;
                                    &nbsp;
                                    <span>GIỎ HÀNG</span>
                                </Button>
                            </TippyHeadless>
                        </div>

                    </div>
                </div>
            </div>
            {isShow && (
                <div onClick={() => setIsShow(false)} className={clsx("position-fixed", styles.backCategory)}>
                    <Category className={clsx("position-absolute shadow mt-1", styles.Category)} />
                </div>
            )}
        </div>
    );
}

export default Header;
