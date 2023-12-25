import clsx from "clsx";
import { Spinner } from "react-bootstrap";
import styles from './Reload.module.scss';

const Reload = () => {
    return (
        <div className={clsx(styles.loadingDiv)}>
            <Spinner style={{ width: "4rem", height: "4rem", color: "white" }} />
        </div>
    );
}

export default Reload;
