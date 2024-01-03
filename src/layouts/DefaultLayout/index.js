import { useState, useEffect } from "react";
import { Header, Footer, MobileFooterNavbar } from "../../components";
import { FaArrowUp } from "react-icons/fa";
import clsx from "clsx";

const DefaultLayout = ({ children }) => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const triggerPosition = window.innerHeight * 0.5;

            setIsVisible(scrollPosition > triggerPosition);
        };

        // Thêm sự kiện cuộn
        window.addEventListener('scroll', handleScroll);

        // Xóa sự kiện khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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
            {isVisible && (
                <button onClick={scrollToTop} style={{ position: 'fixed', bottom: '6rem', right: '0.5rem', zIndex: '2000', border: 'transparent', padding: '1rem', width: '44px', height: '44px', borderRadius: '50%', color: 'white', background: 'gray' }}>
                    <FaArrowUp />
                </button>
            )}
        </>
    );
}

export default DefaultLayout;
