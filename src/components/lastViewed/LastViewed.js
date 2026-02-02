import { Link } from "react-router";

import './lastViewed.scss'

const LastViewed = ({ lastViewedIds, slides }) => {

    const viewedSlides = lastViewedIds
        .map(id => slides.find(item => item.id === id))
        .filter(Boolean);

    return (
        <div className="container">
            <div className="lastViewed">
                <h2 className="lastViewed__title">Last viewed</h2>
                <div className="lastViewed__wrapper">
                    {viewedSlides.length === 0 ?
                        <div>There is no forecomes</div>
                        : viewedSlides.map((item, i) => (
                            <Link key={i} to={`/forecome/${item.id}`}
                                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >
                                <div className="lastViewed-card">
                                    <div className="lastViewed-bg">
                                        <img className="lastViewed-img" src={item.img} alt={item.title} />
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