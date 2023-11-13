import React from "react";
import { Header, Footer } from "../../components";

const DefaultLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <div className="container">
                {children}
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default DefaultLayout;
