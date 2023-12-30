import { useState } from "react";
import styles from "./Toggle.module.scss";

const Toggle = ({ parent, children }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <div className={styles["toggle-parent"]} onClick={() => setIsShow(!isShow)}>
                {parent}
            </div>
            <div className={`${styles["toggle-children"]} ${isShow ? styles["show"] : ""}`}>
                {children}
            </div>
        </>
    );
};

export default Toggle;
