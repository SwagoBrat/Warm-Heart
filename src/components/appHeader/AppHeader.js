import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink, Link } from 'react-router';

import "./appHeader.scss";

const AppHeader = () => {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('user'))
    );

    const [activeMenu, setActiveMenu] = useState(false);
    const [openFromSearch, setOpenFromSearch] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = activeMenu ? "hidden" : "";
    }, [activeMenu]);

    useEffect(() => {
        const interval = setInterval(() => {
            const data = JSON.parse(localStorage.getItem('user'));
            setUserData(data ? { ...data } : null);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const duration = 500;

    return (
        <div className="container">
            <header className="header">
                <ViewModal
                    duration={duration}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    nodeRef={nodeRef}
                    setOpenFromSearch={setOpenFromSearch}
                    openFromSearch={openFromSearch}
                />

                <div className="header__nav">
                    <div
                        className="header__burger"
                        onClick={() => {
                            setActiveMenu(true);
                            setOpenFromSearch(false);
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <h1 className="header__title mobile">
                    <NavLink to='/'>wh</NavLink>
                </h1>

                <h1 className="header__title tabs">
                    <NavLink className='pepefa' to='/'>Warm heart</NavLink>
                </h1>

                <div className="header__icons">
                    <Link to="#"><span className="icon-search"></span></Link>

                    <div
                        className="search__button"
                        onClick={() => {
                            setActiveMenu(true);
                            setOpenFromSearch(true);
                        }}
                    >
                        <span className="search">Search</span>
                    </div>

                    <div className="icon-shop">
                        <span className="icon-shopping-bag header__icon"></span>()
                    </div>

                    <NavLink to={'/cart'} className='header__shop'>
                        Cart({userData?.user?.cart?.length || 0})
                    </NavLink>
                </div>
            </header>
        </div>
    );
};

const ViewModal = ({
    duration,
    activeMenu,
    setActiveMenu,
    nodeRef,
    setOpenFromSearch,
    openFromSearch
}) => {
    const [term, setTerm] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        setTerm('');
    }, [activeMenu]);

    useEffect(() => {
        if (activeMenu && openFromSearch) {
            inputRef.current.focus();
        }
    }, [activeMenu, openFromSearch]);

    return (
        <CSSTransition
            timeout={duration}
            in={activeMenu}
            classNames='modal'
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} className="header__menu">
                <div className="header__menu-left">
                    <div
                        className="header__menu-close"
                        onClick={() => {
                            setActiveMenu(false);
                            setOpenFromSearch(false);
                        }}
                    >
                        <span></span>
                        <span></span>
                    </div>

                    <nav className="header__menu_nav">
                        <ul>
                            <li><NavLink onClick={() => setActiveMenu(false)} to='/shop'>Shop</NavLink></li>
                            <li><NavLink onClick={() => setActiveMenu(false)} to='/contact'>Contact</NavLink></li>
                            <li><NavLink onClick={() => setActiveMenu(false)} to='/aboutUs'>About Us</NavLink></li>
                            <li>
                                <NavLink onClick={() => setActiveMenu(false)} to={'/cart'}>
                                    Cart
                                </NavLink>
                            </li>
                            <li><NavLink onClick={() => setActiveMenu(false)} to='/userProfile'>Profile</NavLink></li>
                        </ul>
                    </nav>

                    <div className="vector"></div>

                    <form className="header__form">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />
                    </form>
                </div>

                <div
                    className="header__menu-rigth"
                    onClick={() => setActiveMenu(false)}
                />
            </div>
        </CSSTransition>
    );
};

export default AppHeader;