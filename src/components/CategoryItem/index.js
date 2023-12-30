import { ListGroup } from "react-bootstrap";
import styles from './CategoryItem.module.scss';
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ children, to, className, isMobile }) => {
    const usenavigate = useNavigate();

    return (
        <ListGroup.Item onClick={to ? () => { usenavigate(to) } : undefined} active={false} className={clsx(className, styles.CategoryItem, {
            "rounded": isMobile,
            "bg-main": isMobile,
            "text-white": isMobile,
            [styles.text_center]: isMobile,
        })}>
            {children}
        </ListGroup.Item>
    );
}
export default CategoryItem;
