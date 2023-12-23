import { LuSendHorizonal } from "react-icons/lu";
import clsx from "clsx";

import styles from './Comment.module.scss';
import Comment from "./Comment";

const Comments = () => {
    return (
        <div>
            <div className={clsx(styles.review_wrapper, "row")}>
                <textarea name="myReviews" id="myReviews" rows="3"
                    className="col form-control"
                    placeholder="Đánh giá của bạn..."
                >

                </textarea>
                <button className="btn col-md-auto"><LuSendHorizonal /></button>
            </div>
            <Comment content={"Hello ae "}>
                <Comment content={"Hello ccc"}></Comment>
            </Comment>
            <Comment content={"Hello ae "}>
                <Comment content={"Hello ccc"}>
                    <Comment content={"DMM"}>
                        <Comment content={"DMM"}>
                            <Comment content={"DMM"}>
                                <Comment content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, iste dolorem? Explicabo non, possimus neque at similique autem nobis qui accusamus repellat, ab unde voluptas quo ratione porro vero libero."}></Comment>
                            </Comment>
                        </Comment>
                    </Comment>
                </Comment>
            </Comment>
            <Comment content={"Hello ae "}>
                <Comment content={"Hello ccc"}></Comment>
            </Comment>
        </div>
    );
}

export default Comments;
