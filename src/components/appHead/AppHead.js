import { useState, useRef, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Link } from "react-router";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./appHead.scss";
import BG from "../../recources/BG/backgroubd.png";
import usePlaidsService from '../../service/PlaidsService';

const AppHead = () => {
    const [productsPhoto, setProductsPhoto] = useState();
    const [active, setActive] = useState(0);
    const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
    const nodeRef = useRef(null);
    const animationFrameRef = useRef(null);
    const containerRef = useRef(null);

    const { getProductImg, error, loading, clearError } = usePlaidsService();

    useEffect(() => {
        clearError()
        getProductImg()
            .then((data) => setProductsPhoto(data))
    }, [])


    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                const rect = containerRef.current.getBoundingClientRect();

                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distanceX = (e.clientX - centerX) / (rect.width / 2);
                const distanceY = (e.clientY - centerY) / (rect.height / 2);

                const limitedX = Math.max(-1, Math.min(1, distanceX));
                const limitedY = Math.max(-1, Math.min(1, distanceY));

                const intensity = 1;
                const maxOffsetX = 60 * intensity;
                const maxOffsetY = 40 * intensity;

                const offsetX = limitedX * maxOffsetX;
                const offsetY = limitedY * maxOffsetY;

                setParallaxOffset({ x: offsetX, y: offsetY });
            });
        };

        const handleMouseLeave = () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            setParallaxOffset({ x: 0, y: 0 });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

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
                                src={productsPhoto[active]}
                                alt="forecome"
                                className="info__img"
                                style={{
                                    transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
                                    transition: 'transform 0.15s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                                    willChange: 'transform'
                                }}
                            />
                        </div>
                    </CSSTransition>
                </SwitchTransition>

                <div className="info__bg-right">
                    <img src={BG} alt="Bg" />
                    <div className="info__pagenation">
                        {productsPhoto.map((_, index) => (
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
            <div className="info__wrapper" ref={containerRef}>
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
                {!loading && !error && productsPhoto !== undefined && renderItems()}
            </div>
        </section>
    );
};

export default AppHead;