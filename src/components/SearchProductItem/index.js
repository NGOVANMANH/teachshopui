import { Link } from "react-router-dom";
import styles from './SearchProductItem.module.scss';
import clsx from "clsx";

const SearchProductItem = () => {
    return (
        <Link to={"/productdetails"} className={clsx("container d-flex justify-content-center align-items-center", styles.SearchProductItem)}>
            <img style={{ width: "2rem" }} src="https://cdn-v2.didongviet.vn/files/products/2023/3/18/1/1681793534301_apple_iphone_11_didongviet.png" alt="hehe" />
            <span>Iphone 11</span>
        </Link>
    );
}

export default SearchProductItem;
