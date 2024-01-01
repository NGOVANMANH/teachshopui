import clsx from "clsx";
import styles from './MobileFooterNavbar.module.scss';
import CategoryItem from "../CategoryItem";
import { useEffect, useState } from "react";

const LeftCategory = ({ isActive }) => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        if (isActive === true) {
            setActive(true);
        }
    }, [isActive])

    return (
        <div className={styles.left_category_wrapper} onClick={() => setActive(false)}>
            <div className={clsx("my-shadow", styles.left_category, { [styles.active]: active, [styles.hidden]: !active })}>
                <CategoryItem to={"/products/phone"}>Điện thoại</CategoryItem>
                <CategoryItem to={"/products/cable"}>Dây sạc</CategoryItem>
                <CategoryItem to={"/products/backupcharger"}>Sạc dự phòng</CategoryItem>
                <CategoryItem to={"/products/adapter"}>Củ sạc</CategoryItem>
            </div>
        </div>
    );
}

export default LeftCategory;
