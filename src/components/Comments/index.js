import { LuSendHorizonal } from "react-icons/lu";
import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from './Comment.module.scss';
import Comment from "./Comment";
import { getComments, addComment } from "../../services/commentServices";
import { NOT_FOUND, SUCCESS_RESPONSE } from "../../services/constants";
import { Spinner } from "react-bootstrap";
import { useContextData } from "../../hooks";

const Comments = ({ data }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [sendingComment, setSendingComment] = useState(false);
    const [content, setContent] = useState('');

    const { user } = useContextData();

    const fetchComments = async (productId) => {
        setIsLoading(true);
        const res = await getComments(productId);
        if (res !== NOT_FOUND) {
            if (res.review) {
                setComments(res.review)
            }
            else setComments([]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchComments(data);
    }, [data])

    const handleComment = async () => {
        if (user && user.auth) {
            if (!content.trim()) {
                return
            }
            setSendingComment(true);
            const res = await addComment(data, content.trim(), 5);
            if (res) {
                if (res !== NOT_FOUND) {
                    fetchComments(data);
                    if (res.status !== SUCCESS_RESPONSE) {
                        alert(res.message);
                    }
                }
                setSendingComment(false);
                setContent('');
            }
        }
        else {
            alert("Vui lòng đăng nhập!")
        }
    }

    return (
        <div>
            <div className={clsx(styles.review_wrapper, "row")}>
                <div className="col">
                    <textarea name="myReviews" id="myReviews" rows="3"
                        className="form-control"
                        placeholder="Đánh giá của bạn..."
                        spellCheck={false}
                        onChange={e => setContent(e.target.value)}
                        value={content}
                        onKeyDown={e => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleComment();
                            }
                        }}
                    >
                    </textarea>
                </div>
                <button className="btn col-auto" onClick={handleComment}>{sendingComment ? <Spinner /> : <LuSendHorizonal />}</button>
            </div>
            {
                isLoading ? <Spinner /> :
                    comments && comments.length > 0 ?
                        comments.map(comment => (
                            <Comment key={`comment` + comment.id} content={comment.content} time={comment.created_at} author={comment.name}>
                                {
                                    comment.admin_reply && <Comment content={comment.admin_reply} time={comment.updated_at} author={"Admin"} />
                                }
                            </Comment>
                        )) :
                        "Không có đánh giá nào cho sản phẩm này"
            }
        </div>
    );
}

export default Comments;
