import AppHeader from "../../appHeader/AppHeader";
import AppFooter from "../../appFooter/AppFooter";
import LastViewed from "../../lastViewed/LastViewed";
import AppCard from "../../appCard/AppCard";
import AppAlso from "../../appAlso/AppAlso";

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";


import './singleForecome.scss'

const SingleForecome = ({ setCarts, carts, slides }) => {

    const { id } = useParams();
    const numericId = Number(id)

    const [lastViewedIds, setLastViewedIds] = useState(() => {
        const saved = localStorage.getItem("lastViewedIds");
        return saved ? JSON.parse(saved) : [];
    });


    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const forecome = slides.find(item => item.id === numericId);

    return (
        <>
            <AppHeader carts={carts} slides={slides} />
            <div className="container">
                <div className="singl__nav">
                    <Link className="singl__nav-link" to={`/`}>Home</Link>
                    <span className="singl__nav-line">/</span>
                    <Link className="singl__nav-link" to={`/shop`}>Shop</Link>
                    <span className="singl__nav-line">/</span>
                    <Link className="singl__nav-link" to={`/forecome/${forecome.id}`}>{forecome.title}</Link>
                </div>
            </div>
            <AppCard setCarts={setCarts} forecome={forecome} />
            <AppAlso slides={slides} forecome={forecome} />
            <LastViewed lastViewedIds={lastViewedIds} slides={slides} />
            <AppFooter />
        </>
    )
}

export default SingleForecome