import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { HiOutlineMapPin } from 'react-icons/hi2';
import { TfiHeadphone } from 'react-icons/tfi';
import { HiOutlineSpeakerphone, HiMenu } from 'react-icons/hi';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineThunderbolt, AiOutlineShoppingCart } from 'react-icons/ai';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import logo from '../../assets/images/logo.svg';
import styles from './Header.module.scss';
import Category from "../Category";
import PopperWrapper from "../PopperWrapper";

const Header = () => {
    const usenavigate = useNavigate();
    const [isShow, setIsShow] = useState(false);

    const showCategory = () => {
        setIsShow(!isShow);
    }

    const [visibleSearchResult, setVisibleSearchResult] = useState(false);
    const show = () => setVisibleSearchResult(true);
    const hide = () => setVisibleSearchResult(false);

    return (
        <div className={clsx("Header position-fixed", styles.Header)}>
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
                                <Link to="/news">Tin Tức</Link>
                            </div>
                            <div className={clsx(styles.userDiv)}>
                                <FaUserCircle className={clsx(styles.userDivIcon)} />
                                <Link to="/login">Đăng nhập</Link>
                                <span> / </span>
                                <Link to="/signup">Đăng kí</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className={clsx("Header-2", "container ")}>


                    <div className="row">

                        <Tippy content="Back to home" placement="bottom">
                            <div className={clsx("col-md-auto")}>
                                <Link to="/"><img src={logo} alt="logo" className={clsx(styles.logo)} /></Link>
                            </div>
                        </Tippy>

                        <div className={clsx("col", styles.centerY)}>
                            <Button onClick={showCategory} className={clsx("bg-main d-flex justify-content-center align-items-center", styles.categoryButton)}><HiMenu /><span>DANH MỤC</span></Button>
                        </div>

                        <div className={clsx("col", styles.centerY)}>
                            <TippyHeadless
                                interactive
                                content="Search result"
                                placement="bottom"
                                visible={visibleSearchResult}
                                render={attrs => (
                                    <PopperWrapper>
                                        <ul>
                                            <li>HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                        </ul>
                                    </PopperWrapper>
                                )}
                                onClickOutside={hide}
                            >
                                <div className={clsx("input-group", styles.search)}>
                                    <input onClick={show} type="search" className={clsx("form-control rounded")} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                    <Tippy content="Tìm kiếm" placement="bottom"><button onClick={() => { usenavigate('/search') }} type="button" className={clsx("btn btn-outline-primary bg-main")}><FaSearch className="text-white" /></button></Tippy>
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
                                    <PopperWrapper>
                                        <ul>
                                            <li>HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                            <li>Hello</li>
                                        </ul>
                                    </PopperWrapper>
                                )}
                            >
                                <Button onClick={() => { usenavigate('/cart') }} variant="outline-success" className={clsx("d-flex justify-content-center align-items-center", styles.categoryButton)}><AiOutlineShoppingCart /><span>GIỎ HÀNG</span></Button>
                            </TippyHeadless>
                        </div>

                    </div>
                </div>
            </div>
            {isShow && (
                <div className={clsx("position-fixed", styles.backCategory)}>
                    <Category className={clsx("position-absolute shadow mt-1", styles.Category)} />
                </div>
            )}
        </div>
    );
}

export default Header;
