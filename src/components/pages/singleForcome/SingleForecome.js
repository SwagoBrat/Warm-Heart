import AppHeader from "../../appHeader/AppHeader";
import AppFooter from "../../appFooter/AppFooter";
import LastViewed from "../../lastViewed/LastViewed";
import AppCard from "../../appCard/AppCard";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";
import AppAlso from '../../appAlso/AppAlso';

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Spinner from "../../spinner/Spinner";
import usePlaidsService from '../../../service/PlaidsService';

import './singleForecome.scss';
import UserService from '../../../service/UserService';

const SingleForecome = () => {
    const { id } = useParams();
    const { getProductById, loading, error } = usePlaidsService()
    const [plaid, setPlaid] = useState();

    useEffect(() => {
        getProductById(id).then(data => setPlaid(data))
    }, [id]);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);


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
                <AppHeader />
            </ErrorBoundary>
            {error && <ErrorMessage />}
            {loading && <Spinner />}

            {!error && !loading && plaid && (
                <>
                    <ErrorBoundary>
                        <div className="container">
                            <div className="singl__nav">
                                <Link className="singl__nav-link" to={`/`}>Home</Link>
                                <span className="singl__nav-line">/</span>
                                <Link className="singl__nav-link" to={`/shop`}>Shop</Link>
                            </div>
                        </div>
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <AppCard forecome={plaid} />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <AppAlso plaid={plaid} />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <LastViewed />
                    </ErrorBoundary>
                </>
            )}
            <AppFooter />
        </>
    );
};

export default SingleForecome;
