import AppHeader from "../../appHeader/AppHeader";
import AppFooter from "../../appFooter/AppFooter";
import LastViewed from "../../lastViewed/LastViewed";
import AppCard from "../../appCard/AppCard";
import AppAlso from "../../appAlso/AppAlso";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";

import { useEffect } from "react";
import { useParams, Link } from "react-router";
import Spinner from "../../spinner/Spinner";

import './singleForecome.scss';

const SingleForecome = ({ setCarts, carts, slides, handleCardClick, lastViewedIds, loading, error }) => {
    const { id } = useParams();
    const numericId = Number(id);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const forecome = slides.find(item => item.id === numericId);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Plaids market place"
                />
                <title>Plaids single page</title>
            </Helmet >
            <ErrorBoundary>
                <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick} />
            </ErrorBoundary>
            {error && <ErrorMessage />}
            {loading && <Spinner />}

            {!error && !loading && forecome && (
                <>
                    <ErrorBoundary>
                        <div className="container">
                            <div className="singl__nav">
                                <Link className="singl__nav-link" to={`/`}>Home</Link>
                                <span className="singl__nav-line">/</span>
                                <Link className="singl__nav-link" to={`/shop`}>Shop</Link>
                                <span className="singl__nav-line">/</span>
                                <Link className="singl__nav-link" to={`/forecome/${forecome.id}`}>{forecome.title}</Link>
                            </div>
                        </div>
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <AppCard numericId={numericId} setCarts={setCarts} forecome={forecome} />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <AppAlso slides={slides} forecome={forecome} handleCardClick={handleCardClick} />
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

export default SingleForecome;
