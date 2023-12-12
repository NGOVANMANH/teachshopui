import { useEffect } from "react";

const News = () => {

    useEffect(() => {
        document.title = "News - Techshop";
    }, [])

    return (
        <div style={{ height: "60vh" }} className="mt-3 mb-3">
            <div className="container bg-white rounded h-100 d-flex align-items-center justify-content-center">
                "Không có tin mới"
            </div>
        </div>
    );
}

export default News;
