import React from "react";
import { Header, Footer } from "../../components";

const DefaultLayout = ({ children }) => {
    return (
        <div className="container">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
