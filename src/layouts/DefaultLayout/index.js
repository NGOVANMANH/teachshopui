import React from "react";
import { Header, Footer } from "../../components";
import clsx from "clsx";

const DefaultLayout = ({ children }) => {

    return (
        <React.Fragment>
            <Header />
            <div className="mt-3"></div>
            <div className={clsx("container")} style={{ minHeight: "60vh" }}>
                {children}
            </div>
            <div className="mb-3"></div>
            <Footer />
        </React.Fragment>
    );
}

export default DefaultLayout;
