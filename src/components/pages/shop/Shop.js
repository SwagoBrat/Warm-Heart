import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import usePlaidsService from '../../../service/PlaidsService';
import usePlaidsFilterService from '../../../service/PlaidsFilterService';


import AppHeader from "../../appHeader/AppHeader";
import AppCards from "../../appCards/AppCards";
import AppFooter from "../../appFooter/AppFooter";
import MenuFilter from "../../menuFilter/MenuFilter";
import LastViewed from "../../lastViewed/LastViewed";
import Spinner from "../../spinner/Spinner";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import ErrorMessage from "../../errorMessage/ErrorMessage";




import './shop.scss';

const Shop = () => {
    const { getProductData, loading, error } = usePlaidsService()
    const { getAllFilters, clearError, errorFilters, filterLoading } = usePlaidsFilterService();

    const [filters, setFilters] = useState();
    const [products, setProducts] = useState();
    const [productFilters, setProductFilters] = useState({ color: '', size: '', price: '' });
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)

    useEffect(() => {
        getProductData(productFilters.color, productFilters.size, productFilters.price)
            .then((data) => setProducts(data))
    }, [productFilters])

    useEffect(() => {
        clearError();
        getAllFilters()
            .then((data) => setFilters(data));
    }, []);

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
                <AppHeader />
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

            {error && errorFilters && errorItem()}
            {(loading || filterLoading) && spinnerItem()}
            {!error && !loading && products !== undefined && filters !== undefined && (
                <>
                    <ErrorBoundary>
                        <MenuFilter setProductFilters={setProductFilters} filters={filters} totalProductLeght={products[1]} productFilters={productFilters} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <AppCards filters={filters} products={products} />
                    </ErrorBoundary>
                    {
                        user === null ? null
                            : (
                                <ErrorBoundary>
                                    <LastViewed />
                                </ErrorBoundary>
                            )
                    }
                </>
            )}
            <AppFooter />
        </>
    );
};

export default Shop;