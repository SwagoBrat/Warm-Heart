import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

import Spinner from '../spinner/Spinner';

import './appPopular.scss';

const AppPopular = ({ slides }) => {
    const sliceSlides = slides.slice(0, 8);
    const visibleSlides = 3;
    const [index, setIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    const slideRef = useRef(null);
    const maxIndex = Math.max(sliceSlides.length - visibleSlides, 0);

    useEffect(() => {
        if (slideRef.current) {
            const slide = slideRef.current;
            let gap = slide.offsetWidth === 310 ? 10 : 20;
            setSlideWidth(slide.offsetWidth + gap);
        }
    }, [sliceSlides.length]);

    const next = () => {
        if (maxIndex === 0) return;
        setIndex(index === maxIndex ? 0 : index + 1);
    };

    const prev = () => {
        if (maxIndex === 0) return;
        setIndex(index === 0 ? maxIndex : index - 1);
    };

    return (
        <section className="popular">
            <div className="container">
                <h2 className="popular__title">Popular products</h2>
                <div className="popular__wrapper">
                    {sliceSlides.length > 0 ? (
                        <>
                            <div
                                className="swiper-wrapper"
                                style={{
                                    transform: `translateX(-${index * slideWidth}px)`,
                                    transition: '0.4s ease'
                                }}
                            >
                                {sliceSlides.map((item, idx) => (
                                    <Link key={item.id} to={`/forecome/${item.id}`} className='swiper-link'>
                                        <div
                                            className="swiper-slide"
                                            ref={idx === 0 ? slideRef : null}
                                        >
                                            <div className="bg">
                                                <img src={item.img} alt={item.title} />
                                            </div>
                                            <h3 className="swipper__title">{item.title}</h3>
                                            <div className="swipper__parametrs">
                                                <p>{item.size}</p>
                                                <p>{item.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {maxIndex > 0 && (
                                <div className="swiper-paginations">
                                    {sliceSlides.slice(0, maxIndex + 1).map((_, i) => (
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
                                    <button className="swiper-rigth" onClick={prev}></button>
                                    <button className="swiper-left" onClick={next}></button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className='popular__spinner'> <Spinner /> </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AppPopular;