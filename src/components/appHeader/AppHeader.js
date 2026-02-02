import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { NavLink, Link } from 'react-router';

import "./appHeader.scss";

const AppHeader = ({ carts, slides }) => {
    const [activeMenu, setActiveMenu] = useState(false);
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
                    slides={slides} />

                <div className="header__nav">
                    <div
                        className="header__burger"
                        onClick={() => setActiveMenu(true)}
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
                    <a href="#"><span className="search">Search</span></a>
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

const ViewModal = ({ duration, activeMenu, setActiveMenu, nodeRef, carts, slides }) => {
    const [term, setTerm] = useState('')
    const plaidsSearch = slides.filter(slide =>
        term.length > 0 && slide.title.toLowerCase().includes(term.toLowerCase())
    );


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
                        onClick={() => setActiveMenu(false)}
                    >
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="header__menu_nav">
                        <ul>
                            <li><NavLink to='/shop' className="header__menu_link">Shop</NavLink></li>
                            <li><NavLink to='/contact' className="header__menu_link">Contact</NavLink></li>
                            <li>                    <NavLink to={'/cart'} className="cart">
                                <span className="shopping-bag">Cart</span>({carts.length})
                            </NavLink></li>
                        </ul>
                    </nav>
                    <div className="vector"></div>
                    <form className="header__form">
                        <input type="text" placeholder="Search" value={term} onChange={(e) => setTerm(e.target.value)} />
                    </form>
                    <SearchModal plaidsSearch={plaidsSearch} term={term} />
                </div>
                <div
                    className="header__menu-rigth"
                    onClick={() => setActiveMenu(false)}
                />
            </div>
        </CSSTransition>
    )
}


const SearchModal = ({ plaidsSearch, term }) => {
    return (
        <div className="header__search">
            {
                plaidsSearch.length == 0 && term.length > 1
                    ? <p>There is no plaids with this name</p>
                    : plaidsSearch.map((item, i) => {
                        return (
                            <Link key={i} to={`/forecome/${item.id}`} className="cards__link">
                                <div className="cards-slide"
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
                        )
                    })
            }
        </div>
    )

}

export default AppHeader;
