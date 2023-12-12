import { FaRegUser, FaRegClock } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";

import styles from './Comment.module.scss';
import clsx from 'clsx';

const Comment = () => {
    return (
        <div className={clsx(styles.comment_area_user, "row my-shadow rounded")}>
            <div className="row">
                <div className={clsx(styles.user_avatar, "col-md-auto")}>
                    <FaRegUser />
                </div>
                <div className="col">
                    <div className={clsx(styles.user_name, "row")}>
                        <div className="col">
                            Mạnh
                        </div>
                        <div
                            className={clsx(styles.button_comment_service, "col-md-auto")}
                            style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem", fontWeight: "700" }}
                        >
                            <IoMdMore />
                        </div>
                    </div>
                    <div className={clsx(styles.user_comment_time, "row align-items-center text-secondary")}>
                        <FaRegClock className="w-auto p-0" />&nbsp;30/10/2003 19:01
                    </div>
                    <div className={clsx(styles.user_comment_content, "row")}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo magni quis perspiciatis quaerat quas porro fuga suscipit, quidem aperiam accusantium ipsam unde tempora tempore. Sunt dolor error eum perspiciatis? Sed?
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <div
                    className={clsx(styles.button_comment_service)}
                    style={{ padding: "0.2rem 0.5rem", fontSize: "1.2rem", fontWeight: "700" }}
                >
                    Phản hồi
                </div>
            </div>
        </div>
    );
}

export default Comment;
