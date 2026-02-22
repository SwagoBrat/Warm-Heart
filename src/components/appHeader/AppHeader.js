import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink, Link } from 'react-router';

import video from '../../videos/pepefa.mp4'

import "./appHeader.scss";

const AppHeader = ({ carts, slides, handleCardClick }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [openFromSearch, setOpenFromSearch] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = activeMenu ? "hidden" : "";
    }, [activeMenu]);

    const duration = 500;

    return (
        <div className="container">
            <header className="header">
                <ViewModal
                    duration={duration}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    nodeRef={nodeRef}
                    carts={carts}
                    slides={slides}
                    handleCardClick={handleCardClick}
                    setOpenFromSearch={setOpenFromSearch}
                    openFromSearch={openFromSearch}
                />
                <div className="header__nav">
                    <div
                        className="header__burger"
                        onClick={() => {
                            setActiveMenu(true)
                            setOpenFromSearch(false)
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="header__nav-nav">
                        <ul>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contacts</a></li>
                        </ul>
                    </nav>
                </div>
                <h1 className="header__title mobile"><NavLink to='/'>wh</NavLink></h1>
                <h1 className="header__title tabs"><NavLink to='/'>Warm heart</NavLink></h1>
                <div className="header__icons">
                    <a href="#"><span className="icon-search"></span></a>
                    <a className="search__button"
                        onClick={() => {
                            setActiveMenu(true)
                            setOpenFromSearch(true)
                        }}><span className="search">Search</span></a>
                    <a href="#" className="icon-shop">
                        <span className="icon-shopping-bag header__icon"></span>({carts.length})
                    </a>
                    <NavLink to={'/cart'} className="cart">
                        <span className="shopping-bag">Cart</span>({carts.length})
                    </NavLink>
                </div>
            </header>
        </div >
    );
};
const ViewModal = ({ duration, activeMenu, setActiveMenu, nodeRef, carts, slides, handleCardClick, setOpenFromSearch, openFromSearch }) => {
    const [term, setTerm] = useState('')
    const plaidsSearch = slides.filter(slide =>
        term.length > 0 && slide.title.toLowerCase().includes(term.toLowerCase())
    );

    const inputRef = useRef(null);

    useEffect(() => {
        setTerm('')
    }, [activeMenu])

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
                            setActiveMenu(false)
                            setOpenFromSearch(false)
                        }}
                    >
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="header__menu_nav">
                        <ul>
                            <li><NavLink onClick={() => setActiveMenu(false)} to='/shop' className="header__menu_link">Shop</NavLink></li>
                            <li><NavLink onClick={() => setActiveMenu(false)} to='/contact' className="header__menu_link">Contact</NavLink></li>
                            <li><NavLink onClick={() => setActiveMenu(false)} to='/aboutUs' className="header__menu_link">About Us</NavLink></li>
                            <li><NavLink onClick={() => setActiveMenu(false)} to={'/cart'} className="cart">
                                <span className="shopping-bag">Cart</span>({carts.length})
                            </NavLink></li>
                        </ul>
                    </nav>
                    <div className="vector"></div>
                    <form className="header__form">
                        <input ref={inputRef} type="text" placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />
                    </form>
                    <SearchModal
                        setActiveMenu={setActiveMenu}
                        plaidsSearch={plaidsSearch}
                        term={term}
                        duration={duration}
                        handleCardClick={handleCardClick} />
                </div>
                <div
                    className="header__menu-rigth"
                    onClick={() => setActiveMenu(false)}
                />
            </div>
        </CSSTransition>
    )
}


const SearchModal = ({ plaidsSearch, term, duration, handleCardClick, setActiveMenu }) => {
    const nodeRef = useRef(null);

    return (
        <CSSTransition
            timeout={duration}
            in={term.length > 0}
            classNames="modal"
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} className="header__search">
                {
                    plaidsSearch.length === 0 && term.length >= 1
                        ? <p>There is no plaids with this name</p>
                        : plaidsSearch.map(item => (
                            <Link
                                key={item.id}
                                to={`/forecome/${item.id}`}
                                className="cards__link"
                            >
                                <div className="cards-slide"
                                    onClick={() => {
                                        handleCardClick(item.id)
                                        setActiveMenu(false)
                                    }}
                                >
                                    <div className="cards__bg">
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                    <h3 className="cards__title">{item.title}</h3>
                                    <div className="cards__parametrs">
                                        <p>{item.size}</p>
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                }
            </div>
        </CSSTransition>
    );
};


export default AppHeader;
