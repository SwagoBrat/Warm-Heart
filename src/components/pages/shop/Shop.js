import { useState } from "react";

import AppHeader from "../../appHeader/AppHeader";
import AppCards from "../../appCards/AppCards";
import AppFooter from "../../appFooter/AppFooter";
import MenuFilter from "../../menuFilter/MenuFilter";
import LastViewed from "../../lastViewed/LastViewed";
import Spinner from "../../spinner/Spinner";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";

import './shop.scss';
import ErrorMessage from "../../errorMessage/ErrorMessage";

const Shop = ({ carts, slides, lastViewedIds, handleCardClick, loading, error }) => {
    const [filters, setFilters] = useState({
        size: '',
        price: '',
    });

    const spinnerItem = () => {
        return (
            <div className="head__spinner">
                <Spinner />
            </div>
        )
    }

    const errorItem = () => {
        return (
            <div className="head__spinner">
                <ErrorMessage />
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Plaids shop"
                />
                <title>Plaids shop</title>
            </Helmet >
            <ErrorBoundary>
                <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick} />
            </ErrorBoundary>
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

            <ErrorBoundary>
                <MenuFilter filters={filters} setFilters={setFilters} slides={slides} />
            </ErrorBoundary>
            {error && errorItem()}
            {loading && spinnerItem()}
            {!error && !loading && slides.length > 0 && (
                <>
                    <ErrorBoundary>
                        <AppCards filters={filters} handleCardClick={handleCardClick} slides={slides} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <LastViewed lastViewedIds={lastViewedIds} slides={slides} />
                    </ErrorBoundary>
                </>
            )}
            <AppFooter />
        </>
    );
};

export default Shop;