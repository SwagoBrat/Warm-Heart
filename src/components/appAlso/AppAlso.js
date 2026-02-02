import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

import imgForecome1 from "../../recources/forecome/forecome.png";
import imgForecome2 from "../../recources/forecome/forecome2.png";
import imgForecome3 from "../../recources/forecome/secondPled.png";
import imgForecome4 from "../../recources/forecome/thirdPled.png";
import imgForecome5 from "../../recources/forecome/fourthPled.png";

const AppAlso = ({ slides, forecome }) => {
    const filtered = slides.filter((slide) => slide.size === forecome.size && slide.id !== forecome.id);
    const sliced = filtered.slice(0, 8);

    const visibleSlides = 3;
    const [index, setIndex] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);

    const slideRef = useRef(null);
    const maxIndex = Math.max(sliced.length - visibleSlides, 0);

    useEffect(() => {
        if (slideRef.current) {
            const slide = slideRef.current;
            let gap = 0;
            slide.offsetWidth === 310 ? gap = 10 : gap = 20;
            setSlideWidth(slide.offsetWidth + gap);
        }
    }, []);

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
                <h2 className="popular__title">You may also like</h2>
                <div className="popular__wrapper">
                    <div
                        className="swiper-wrapper"
                        style={{
                            transform: `translateX(-${index * slideWidth}px)`,
                            transition: '0.4s ease'
                        }}
                    >
                        {sliced.map((item, idx) => (
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
                            {sliced.slice(0, maxIndex + 1).map((_, i) => (
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
                </div>
            </div>
        </section>
    )
}

export default AppAlso;