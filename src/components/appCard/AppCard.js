import { useState, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import './appCard.scss';

const AppCard = ({ forecome, setCarts }) => {
    const [count, setCount] = useState(1)
    const [activeChoice, setActiveChoice] = useState('description');
    const nodeRef = useRef(null);

    let content = "";
    if (activeChoice === 'description') {
        content = forecome.description ? forecome.description : "No description for this plaid";
    } else if (activeChoice === 'details') {
        content = forecome.details ? forecome.details : "No details explanation for this plaid";
    } else if (activeChoice === 'delivery') {
        content = forecome.delivery ? forecome.delivery : "No delivery explanation for this plaid";
    }

    const plaid = {
        id: forecome.id,
        counter: count
    }

    const handleAddClick = (plaid) => {
        setCarts((prev) => {
            const exists = prev.find(item => item.id === plaid.id);
            if (exists) {
                return prev.map(item =>
                    item.id === plaid.id
                        ? { ...item, counter: plaid.counter }
                        : item
                );
            } else {
                return [...prev, plaid];
            }
        });
    }

    const handleMinus = () => setCount(prev => (prev === 1 ? 1 : prev - 1));
    const handlePlus = () => setCount(prev => (prev + 1));
    return (
        <div className="container">
            <div className="card">
                <div className='card-slider'>
                    <img src={forecome.img} alt={forecome.title} />
                </div>
                <div className='card-info'>
                    <h2 className='card__title'>{forecome.title}</h2>
                    <p className='card__price'>{forecome.price}</p>
                    <div className='card__desccription'>
                        <ul className='card__desccription-ul'>
                            <li onClick={() => setActiveChoice('description')} className={activeChoice === 'description'
                                ? 'card__desccription-button card__desccription-button_active'
                                : 'card__desccription-button'
                            }>Description</li>
                            <li onClick={() => setActiveChoice('details')} className={activeChoice === 'details'
                                ? 'card__desccription-button card__desccription-button_active'
                                : 'card__desccription-button'
                            }>Details</li>
                            <li onClick={() => setActiveChoice('delivery')} className={activeChoice === 'delivery'
                                ? 'card__desccription-button card__desccription-button_active'
                                : 'card__desccription-button'
                            }>Delivery</li>
                        </ul>

                        <SwitchTransition mode="out-in">
                            <CSSTransition
                                key={activeChoice}
                                timeout={300}
                                classNames="fade"
                                unmountOnExit
                                nodeRef={nodeRef}
                            >
                                <p ref={nodeRef} className='card__desccription-subtitle'>{content}</p>
                            </CSSTransition>
                        </SwitchTransition>
                    </div>
                    <div className='card__details'>
                        <p className='card__details-size'>Size:<span> {forecome.size || 'Nothing'}</span></p>
                        <p className='card__details-color'>Color:<span> {forecome.color || 'Nothing'}</span></p>
                    </div>
                    <div className='card__buttons'>
                        <div className='card__buttons-counter'>
                            <div onClick={handleMinus}
                                className='card__buttons-counter-dec'></div>
                            <div className='card__buttons-counter-count'><span>{count}</span></div>
                            <div onClick={handlePlus}
                                className='card__buttons-counter-inc'> <span></span><span></span></div>
                        </div>
                        <button
                            onClick={() => handleAddClick(plaid)}
                            className='card__buttons-add'>Add to cart</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AppCard;