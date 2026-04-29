import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import '../appPopular/appPopular.scss';
import usePlaidsService from '../../service/PlaidsService';

const AppAlso = ({ plaid }) => {
    const [slides, setSlides] = useState([]);
    const [index, setIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const visibleSlides = 3;
    const slideRef = useRef(null);
    const maxIndex = Math.max(slides.length - visibleSlides, 0);
    const { getAlsoLikedProducts, loading, error } = usePlaidsService();

    useEffect(() => {
        getAlsoLikedProducts(plaid._id, 8, plaid.size).then((data) => setSlides(data))
    }, [plaid])

    useEffect(() => {
        if (slideRef.current) {
            const slide = slideRef.current;
            let gap = slide.offsetWidth === 310 ? 10 : 20;
            setSlideWidth(slide.offsetWidth + gap);
        }
    }, [slides]);

    const next = () => {
        if (maxIndex === 0) return;
        setIndex(index === maxIndex ? 0 : index + 1);
    };

    const prev = () => {
        if (maxIndex === 0) return;
        setIndex(index === 0 ? maxIndex : index - 1);
    };

    const spinnerItem = () => {
        return (
            <div className='popular__spinner'> <Spinner /> </div>
        )
    }

    const errorItem = () => {
        return (
            <div className='popular__spinner'><ErrorMessage /></div>
        )
    }

    const renderItem = () => {
        return (
            <>
                <div
                    className="swiper-wrapper"
                    style={{
                        transform: `translateX(-${index * slideWidth}px)`,
                        transition: '0.4s ease'
                    }}
                >
                    {slides.map((item, idx) => (
                        <Link key={item._id} to={`/forecome/${item._id}`} className='swiper-link'>
                            <div

                                className="swiper-slide"
                                ref={idx === 0 ? slideRef : null}
                            >
                                <div className="bg">
                                    <img src={item.images[0]} alt={item.name} />
                                </div>
                                <h3 className="swipper__title">{item.name}</h3>
                                <div className="swipper__parametrs">
                                    <p>{item.size}</p>
                                    <p>${item.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
                {maxIndex > 0 && (
                    <div className="swiper-paginations">
                        {slides.slice(0, maxIndex + 1).map((_, i) => (
                            <span
                                key={i}
                                onClick={() => setIndex(i)}
                                className={
                                    i === index
                                        ? "swiper-pagination swiper-pagination__active"
                                        : "swiper-pagination"
                                }
                            />
                        ))}
                        <button className=" swiper-left" onClick={next}><span className='icon-right'></span></button>
                        <button className="swiper-rigth" onClick={prev}> <span className='icon-left'></span></button>
                    </div>
                )}
            </>
        )
    }

    return (slides.length > 0
        ? (
            <section className="popular">
                <div className="container">
                    <h2 className="popular__title">You may also like</h2>
                    <div className="popular__wrapper">
                        {error && errorItem()}
                        {loading && spinnerItem()}
                        {!error && !loading && renderItem()}
                    </div>
                </div>
            </section>
        )
        : null
    );
};

export default AppAlso;