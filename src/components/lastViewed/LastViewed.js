import { Link } from "react-router";
import './lastViewed.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const LastViewed = () => {
    const [viewedSlides, setViewedSlides] = useState();
    const data = JSON.parse(localStorage.getItem('user')) || undefined;

    useEffect(() => {
        setViewedSlides(data.user.lastViewed)
    }, [])
    console.log(data.user.cart.length === 0)


    return (
        <div className="container">
            <div className="lastViewed">
                <h2 className="lastViewed__title">Last viewed</h2>
                <div className="lastViewed__wrapper">
                    {viewedSlides === undefined ?
                        <div>There is no forecomes</div>
                        : viewedSlides.map((item, i) => (
                            <Link key={i} to={`/forecome/${item.productId}`}
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >
                                <div className="lastViewed-card">
                                    <div className="lastViewed-bg">
                                        <img className="lastViewed-img" src={item.img} alt={'plaid'} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div >
        </div>
    )
}

export default LastViewed;