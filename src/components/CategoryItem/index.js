import { ListGroup } from "react-bootstrap";
import styles from './CategoryItem.module.scss';
import clsx from "clsx";

const CategoryItem = ({ children, href, className }) => {

    return (
        <ListGroup.Item action active={false} href={href} className={clsx(className, styles.CategoryItem)}>
            {children}
        </ListGroup.Item>
    );
}
export default CategoryItem;
