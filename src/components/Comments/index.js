import Comment from "./Comment";

const Comments = () => {
    return (
        <div>
            <Comment content={"Hello ae "}>
                <Comment content={"Hello ccc"}></Comment>
            </Comment>
            <Comment content={"Hello ae "}>
                <Comment content={"Hello ccc"}>
                    <Comment content={"DMM"}></Comment>
                </Comment>
            </Comment>
            <Comment content={"Hello ae "}>
                <Comment content={"Hello ccc"}></Comment>
            </Comment>
        </div>
    );
}

export default Comments;
