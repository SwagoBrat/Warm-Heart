import { useState, useEffect } from "react";

import AppHeader from "../../appHeader/AppHeader";
import AppCards from "../../appCards/AppCards";
import AppFooter from "../../appFooter/AppFooter";
import MenuFilter from "../../menuFilter/MenuFilter";
import LastViewed from "../../lastViewed/LastViewed";
import Spinner from "../../spinner/Spinner";

import './shop.scss';

const Shop = ({ carts, slides, lastViewedIds, handleCardClick }) => {
    const [filters, setFilters] = useState({
        size: '',
        price: '',
    });

    return (
        <>
            <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick} />
            <section className="head">
                <div className="head__h1">
                    <div className="container">
                        <div className="head__h1-wrapper">
                            <h2 className="head__h1-title">Shop</h2>
                            <p className="head__h1-subtitle">
                                In our store you will find a large number of high-quality blankets
                                that will help make your home more comfortable and warm your life.
                            </p>
                            <i className="icon-params"></i>
                        </div>
                    </div>
                </div>
            </section>
            {slides.length > 0 ?
                <>
                    <MenuFilter filters={filters} setFilters={setFilters} slides={slides} />
                    <AppCards filters={filters} handleCardClick={handleCardClick} slides={slides} />
                    <LastViewed lastViewedIds={lastViewedIds} slides={slides} />
                </>
                : <div className="head__spinner">
                    <Spinner />
                </div>}
            <AppFooter />
        </>
    );
};

export default Shop;