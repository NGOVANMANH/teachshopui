import clsx from 'clsx';
import styles from './MobileFooterNavbar.module.scss';
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextData } from '../../hooks';
import CategoryItem from "../CategoryItem";

const MobileFooterNavbar = () => {

    const navigate = useNavigate();

    const { user } = useContextData();

    const [activeButton, setActiveButton] = useState(1);
    const [active, setActive] = useState(false);

    const handleClick = (btnID) => {

        switch (btnID) {
            case 1:
                setActiveButton(btnID);
                navigate('/');
                break;
            case 2:
                setActive(!active)
                break;
            case 3:
                break;
            case 4:
                setActiveButton(btnID);
                if (user && user.auth) {
                    navigate("/profile");
                }
                else {
                    navigate("/login");
                }
                break;
            default: ;
        }
    }

    return (
        <>
            <div className={clsx(styles.sticky_footer, "my-shadow")}>
                <div className={clsx('container', styles.wrapper)}>
                    <div className='row p-0'>
                        <div className={clsx('col', styles.item, {
                            [styles.active]: activeButton === 1
                        })} onClick={() => handleClick(1)}>
                            <FaHome />
                            <div>Trang chủ</div>
                        </div>
                        <div className={clsx('col', styles.item, {
                            [styles.active]: active
                        })} onClick={() => handleClick(2)}>
                            <BiCategory />
                            <div>Danh mục</div>
                        </div>
                        <a href="tel:+84705288268" className={clsx('col', styles.item)}>
                            <PiPhoneCallFill />
                            <div>Hotline</div>
                        </a>
                        <div className={clsx('col', styles.item, {
                            [styles.active]: activeButton === 4
                        })} onClick={() => handleClick(4)}>
                            <FaRegUserCircle />
                            <div>Tài khoản</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx(styles.left_category_wrapper, {
                "d-block": active,
                "d-none": !active
            })} onClick={() => { setActive(false) }}>
                <div className={clsx("my-shadow", styles.left_category, { [styles.active]: active, [styles.hidden]: !active })}>
                    <CategoryItem to={"/products/phone"}>Điện thoại</CategoryItem>
                    <CategoryItem to={"/products/cable"}>Dây sạc</CategoryItem>
                    <CategoryItem to={"/products/backupcharger"}>Sạc dự phòng</CategoryItem>
                    <CategoryItem to={"/products/adapter"}>Củ sạc</CategoryItem>
                </div>
            </div>
        </>
    );
}

export default MobileFooterNavbar;
