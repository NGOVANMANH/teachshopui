import { FaRegUser, FaRegClock } from "react-icons/fa";
import { useState } from "react";
import clsx from 'clsx';
import { ImReply } from "react-icons/im";
import { IoMdSend } from "react-icons/io";

import styles from './Comment.module.scss';

const Comment = () => {

    const [isActive, setIsActive] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [commentContent, setCommentContent] = useState('');

    const handleReply = () => {
        setIsActive(!isActive);
    }

    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    const handleComment = () => {
        if (commentContent.length > 0 && commentContent.trim()) {
            const value = commentContent.trim().replace(/\s+/g, ' ');
            console.log(value);
        }
    }

    return (
        <div className={clsx(styles.comment_area_user, "row my-shadow rounded")}>
            <div className="row">
                <div className={clsx(styles.user_avatar, "col-md-auto")}>
                    <FaRegUser />
                </div>
                <div className="col">
                    <div className={clsx(styles.user_name, "row")}>
                        Mạnh
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
                    className={clsx(styles.button_comment_service, {
                        [styles.active]: showMore,
                    })}
                    style={{ padding: "0.2rem 0.5rem", fontSize: "1.2rem", fontWeight: "700" }}
                    onClick={handleShowMore}
                >
                    More
                </div>
                <div
                    className={clsx(styles.button_comment_service, {
                        [styles.active]: isActive,
                    })}
                    style={{ padding: "0.2rem 0.5rem", fontSize: "1.2rem", fontWeight: "700" }}
                    onClick={handleReply}
                >
                    <ImReply />
                </div>
            </div>

            {/* reply div */}
            {
                isActive &&
                <div className={clsx("rounded my-shadow", styles.reply_div)}>
                    <div className="row">
                        <div className={clsx(styles.user_avatar, "col-md-auto")}>
                            <FaRegUser />
                        </div>
                        <div className="col">
                            <div className={clsx(styles.user_name, "row")}>
                                Mạnh
                            </div>
                            <div className={clsx(styles.user_comment_content, "row")}>
                                <textarea
                                    name="commentContent"
                                    className="form-control"
                                    placeholder="Press enter to comment..."
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    spellCheck={false}
                                >
                                </textarea>
                                <button onClick={handleComment} className={styles.button_comment}><IoMdSend /></button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {/* show coment */}
            {
                showMore &&
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col" style={{ padding: "1rem" }}>
                        <div className="row">
                            <div className={clsx(styles.user_avatar, "col-md-auto")}>
                                <FaRegUser />
                            </div>
                            <div className="col">
                                <div className={clsx(styles.user_name, "row")}>
                                    Mạnh
                                </div>
                                <div className={clsx(styles.user_comment_time, "row align-items-center text-secondary")}>
                                    <FaRegClock className="w-auto p-0" />&nbsp;30/10/2003 19:01
                                </div>
                                <div className={clsx(styles.user_comment_content, "row")}>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo magni quis perspiciatis quaerat quas porro fuga suscipit, quidem aperiam accusantium ipsam unde tempora tempore. Sunt dolor error eum perspiciatis? Sed?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Comment;
