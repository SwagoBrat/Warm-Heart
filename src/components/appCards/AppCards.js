import { useState, useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Link } from "react-router";


import "./appCards.scss";

const AppCards = ({ filters, setLastViewedIds, slides }) => {

    const filteredSlides = slides.filter(item => {
        const sizeMatch = !filters?.size || item.size.replace(/\s/g, '') === filters.size.replace(/\s/g, '');
        const priceMatch = !filters?.price || item.price.replace(/\s/g, '') === filters.price.replace(/\s/g, '');
        return sizeMatch && priceMatch;
    });

    const ITEMS_PER_PAGE = 12;
    const duration = 500;

    const [page, setPage] = useState(1);
    const nodeRef = useRef(null);

    const totalPages = Math.ceil(filteredSlides.length / ITEMS_PER_PAGE);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentSlides = filteredSlides.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, filteredSlides]);

    const handlePrev = () => setPage(prev => (prev === 1 ? totalPages : prev - 1));
    const handleNext = () => setPage(prev => (prev === totalPages ? 1 : prev + 1));

    useEffect(() => {
        setPage(1);
    }, [filters]);

    const handleCardClick = (id) => {
        setLastViewedIds(prev => {
            const filtered = prev.filter(itemId => itemId !== id);
            const updated = [id, ...filtered];
            return updated.slice(0, 4);
        })
    }

    const transitionKey = `${filters.size}-${filters.price}-${page}`;

    return (
        <div className="cards">
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={transitionKey}
                    nodeRef={nodeRef}
                    timeout={duration}
                    classNames="cards-anim"
                >
                    <div className="container" ref={nodeRef}>
                        <div className="cards__wrapper">
                            {currentSlides.length === 0 ? (
                                <div>Немає товарів за обраними фільтрами</div>
                            ) : (
                                currentSlides.map((item, i) => (
                                    <Link key={i} to={`/forecome/${item.id}`} className="cards__link">
                                        <div className="cards-slide"
                                            onClick={() => handleCardClick(item.id)}
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
                            )}
                        </div>
                    </div>
                </CSSTransition>
            </SwitchTransition>

            <div className="cards-paginations">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <span
                        key={i}
                        className={
                            page === i + 1
                                ? "cards-pagination__active"
                                : "cards-pagination"
                        }
                        onClick={() => setPage(i + 1)}
                    >
                        <p>{i + 1}</p>
                    </span>
                ))}

                <button className="cards__swiper-left" onClick={handlePrev}>
                    ◀
                </button>
                <button className="cards__swiper-right" onClick={handleNext}>
                    ▶
                </button>
            </div>
        </div>
    );
};
export default AppCards;
