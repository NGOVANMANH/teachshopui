import clsx from 'clsx';
import styles from './MobileFooterNavbar.module.scss';
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextData } from '../../hooks';
import LeftCategory from './LeftCategory';

const MobileFooterNavbar = () => {

    const navigate = useNavigate();

    const { user } = useContextData();

    const [activeButton, setActiveButton] = useState(1);
    const [isSelectCategory, setIsSelectCategory] = useState(false);


    const handleClick = (btnID) => {

        switch (btnID) {
            case 1:
                setActiveButton(btnID);
                navigate('/');
                break;
            case 2:
                setIsSelectCategory(!isSelectCategory);
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
                            [styles.active]: isSelectCategory
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

            <LeftCategory className={clsx("my-shadow", styles.left_category, { [styles.active]: isSelectCategory, [styles.hidden]: !isSelectCategory })} />

        </>
    );
}

export default MobileFooterNavbar;
