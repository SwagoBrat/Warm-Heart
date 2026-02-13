import { useState, useRef, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Link } from "react-router";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./appHead.scss";
import BG from "../../recources/BG/backgroubd.png";

const AppHead = ({ slides , loading, error }) => {
    const [active, setActive] = useState(0);
    const nodeRef = useRef(null);

    const sliceSlides = slides.slice(0, 5);
    


    const renderItems = () => {
        return (
            <>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={active}
                        timeout={200}
                        classNames="fade"
                        nodeRef={nodeRef}
                    >
                        <div ref={nodeRef} className="photo">
                            <img
                                src={sliceSlides[active].img}
                                alt="forecome"
                                className="info__img"
                            />
                        </div>
                    </CSSTransition>
                </SwitchTransition>

                <div className="info__bg-right">
                    <img src={BG} alt="Bg" />
                    <div className="info__pagenation">
                        {sliceSlides.map((image, index) => (
                            <span
                                key={index}
                                onClick={() => setActive(index)}
                                className={
                                    index === active
                                        ? "info__pagenations info__pagenations-active"
                                        : "info__pagenations"
                                }
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    };

    const loadingItem = () => {
        return (
            <div className="info__bg-right">
                <img src={BG} alt="Bg" />
                <div className="info__spinner">
                    <Spinner />
                </div>
            </div>
        );
    };

    const errorItem = () => {
        return (
            <div className="info__bg-right">
                <img src={BG} alt="Bg" />
                <div className="info__spinner">
                    <ErrorMessage />
                </div>
            </div>
        );
    };

    return (
        <section className="info">
            <div className="info__wrapper">
                <div className="info__bg-left">
                    <div className="info__text">
                        <h1 className="info__title">Soft plaids for your comfort</h1>
                        <p className="info__subtitle">
                            Throw a blanket over your shoulders or place it on the arm of the
                            sofa, and the atmosphere in the house will be warmer.
                        </p>
                    </div>
                    <Link className="info__btn" to={`./shop`}>
                        <span>Shop now</span>
                    </Link>
                </div>

                {error && errorItem()}
                {loading && loadingItem()}
                {!loading && !error && sliceSlides.length > 0 && renderItems()}
            </div>
        </section>
    );
};

export default AppHead;
