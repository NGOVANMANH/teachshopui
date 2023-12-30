import { useState, useEffect } from "react";
import { Header, Footer, MobileFooterNavbar } from "../../components";
import clsx from "clsx";

const DefaultLayout = ({ children }) => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Update the screen width when the window is resized
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Header />
            <div className="mt-3"></div>
            <div className={clsx("container")} style={{ minHeight: "60vh" }}>
                {children}
            </div>
            <div className="mb-3"></div>
            <Footer />
            {screenWidth < 768 && <MobileFooterNavbar />}
        </>
    );
}

export default DefaultLayout;
