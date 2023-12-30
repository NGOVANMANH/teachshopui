import clsx from "clsx";
import styles from './MobileFooterNavbar.module.scss';
import CategoryItem from "../CategoryItem";

const LeftCategory = ({ className }) => {
    return (
        <div className={clsx(styles.left_category, className)}>
            <CategoryItem to={"/products/phone"}>Điện thoại</CategoryItem>
            <CategoryItem to={"/products/cable"}>Dây sạc</CategoryItem>
            <CategoryItem to={"/products/backupcharger"}>Sạc dự phòng</CategoryItem>
            <CategoryItem to={"/products/adapter"}>Củ sạc</CategoryItem>
        </div>
    );
}

export default LeftCategory;
