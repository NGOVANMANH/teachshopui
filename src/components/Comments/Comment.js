import { FaRegUserCircle, FaRegClock } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

import clsx from "clsx";
import styles from './Comment.module.scss';
import { useState } from "react";

const Comment = ({ children, content }) => {
    const [isShowMore, setIsShowMore] = useState(false);

    const handleShowMore = (event) => {
        event.preventDefault();
        setIsShowMore(!isShowMore);
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <MdExpandMore className={clsx(styles.button_more, {
                [styles.active]: isShowMore,
                [styles["rotate_-90"]]: isShowMore,
                [styles["rotate-90deg"]]: !isShowMore,
                [styles["rotate_90"]]: !isShowMore,
            })} onClick={handleShowMore} />
            <div className={clsx(styles.avatar)}>
                <FaRegUserCircle />
            </div>
            <div className={clsx(styles.wrapper_left)}>
                <div className={clsx(styles.name)}>
                    Mạnh
                </div>
                <div className={clsx(styles.time)}>
                    <FaRegClock />
                    30/10/2003 19:01
                </div>
                <div className={clsx(styles.content)}>
                    {content}
                </div>
                {
                    isShowMore && children
                }
            </div>
        </div>
    );
}

export default Comment;
