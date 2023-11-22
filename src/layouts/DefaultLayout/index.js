import React from "react";
import { Header, Footer } from "../../components";
import clsx from "clsx";

const DefaultLayout = ({ children }) => {

    return (
        <React.Fragment>
            <Header />
            <div className={clsx("container")}>
                {children}
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default DefaultLayout;
