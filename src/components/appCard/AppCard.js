import { useState, useRef, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './appCard.scss';
import UserService from '../../service/UserService';


const AppCard = ({ forecome }) => {
    const [count, setCount] = useState(1);
    const [index, setIndex] = useState(0);
    const [slideHeight, setSlideHeight] = useState(0);
    const MaxIndex = [0, 1, 2, 3];
    const imgRef = useRef(null);

    const [activeChoice, setActiveChoice] = useState('description');
    const nodeRef = useRef(null);

    const { addUserCart } = UserService()
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const id = storedUser?.user?._id;

    let content = "";
    if (activeChoice === 'description') {
        content = forecome.descr || "No description for this plaid";
    } else if (activeChoice === 'details') {
        content = forecome.details || "No details explanation for this plaid";
    } else if (activeChoice === 'delivery') {
        content = forecome.delivery || "No delivery explanation for this plaid";
    }

    useEffect(() => {
        setCount(1);
    }, []);

    const handleAddCart = (plaid) => {
        addUserCart(id, { ...plaid, img: plaid.images[0], count, productId: plaid._id })
            .then((data) => {
                const updatedData = {
                    ...JSON.parse(localStorage.getItem('user')),
                    user: data,
                };

                localStorage.setItem('user', JSON.stringify(updatedData));
            })
            .catch(console.error);
    };



    const handleImageLoad = () => {
        if (imgRef.current) {
            setSlideHeight(imgRef.current.offsetHeight);
        } else {
            return null
        }
    };


    const handleMinus = () => setCount(prev => (prev === 1 ? 1 : prev - 1));
    const handlePlus = () => setCount(prev => prev + 1);

    const next = () => {
        setIndex(prev => (prev === 3 ? 0 : prev + 1));
    };

    const previous = () => {
        setIndex(prev => (prev === 0 ? 3 : prev - 1));
    };

    return (
        <div className="container">
            <div className="card">
                <div className='card__wrapper'>
                    <div
                        className='card-slider'
                        style={{
                            transform: `translateY(-${index * slideHeight}px)`,
                            transition: '0.4s ease'
                        }}
                    >
                        <img ref={imgRef} onLoad={handleImageLoad} src={forecome.images[0]} alt={forecome.name} />
                        <img src={forecome.images[0]} alt={forecome.name} />
                        <img src={forecome.images[0]} alt={forecome.name} />
                        <img src={forecome.images[0]} alt={forecome.name} />
                    </div>
                </div>
                <button className='btn btn__next' onClick={next} style={{ width: '50px', height: "40px" }}>
                    <span className='icon-right' />
                </button>
                <button className='btn btn__prev' onClick={previous} style={{ width: '50px', height: "40px" }}>
                    <span className='icon-left' />
                </button>
                <ul className='card__pagenations'>
                    {MaxIndex.map((_, i) => (
                        <li className={index === i ? 'card__pagenations-item__active' :
                            'card__pagenations-item'
                        } key={i} onClick={() => setIndex(i)}>
                            <img src={forecome.images[0]} alt={forecome.name} />
                        </li>
                    ))}
                </ul>
                <div className='card-info'>
                    <h2 className='card__title'>{forecome.name}</h2>
                    <p className='card__price'>${forecome.price}</p>

                    <div className='card__desccription'>
                        <ul className='card__desccription-ul'>
                            <li
                                onClick={() => setActiveChoice('description')}
                                className={activeChoice === 'description'
                                    ? 'card__desccription-button card__desccription-button_active'
                                    : 'card__desccription-button'}
                            >
                                Description
                            </li>

                            <li
                                onClick={() => setActiveChoice('details')}
                                className={activeChoice === 'details'
                                    ? 'card__desccription-button card__desccription-button_active'
                                    : 'card__desccription-button'}
                            >
                                Details
                            </li>

                            <li
                                onClick={() => setActiveChoice('delivery')}
                                className={activeChoice === 'delivery'
                                    ? 'card__desccription-button card__desccription-button_active'
                                    : 'card__desccription-button'}
                            >
                                Delivery
                            </li>
                        </ul>
                        <SwitchTransition mode="out-in">
                            <CSSTransition
                                key={activeChoice}
                                timeout={300}
                                classNames="fade"
                                nodeRef={nodeRef}
                            >
                                <p ref={nodeRef} className='card__desccription-subtitle'>
                                    {content}
                                </p>
                            </CSSTransition>
                        </SwitchTransition>
                    </div>

                    <div className='card__details'>
                        <p className='card__details-size'>
                            Size:<span> {forecome.size || 'Nothing'}</span>
                        </p>
                        <p className='card__details-color'>
                            Color:<span> {forecome.color || 'Nothing'}</span>
                        </p>
                    </div>

                    <div className='card__buttons'>
                        <div className='card__buttons-counter'>
                            <div onClick={handleMinus} className='card__buttons-counter-dec'></div>
                            <div className='card__buttons-counter-count'>
                                <span style={{ marginRight: count >= 10 ? '11px' : '0px' }}>{count}</span>
                            </div>
                            <div onClick={handlePlus} className='card__buttons-counter-inc'>
                                <span></span><span></span>
                            </div>
                        </div>

                        <button
                            className='card__buttons-add'
                            onClick={() => handleAddCart(forecome)}>
                            Add to cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AppCard;