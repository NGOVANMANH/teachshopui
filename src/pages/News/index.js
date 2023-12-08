import { useEffect } from "react";

const News = () => {
    useEffect(() => {
        document.title = "News - Techshop";
    }, [])
    return (
        <div style={{ height: "200vh" }}>
            News
        </div>
    );
}

export default News;
