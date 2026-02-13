import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './shopppingCart.scss'

const ShoppingCart = ({ plaids, setCarts }) => {

    const handlePlusClick = (plaid) => {
        setCarts((prev) => {

            return prev.map(item =>
                item.id === plaid.id
                    ? { ...item, counter: plaid.counter + 1 }
                    : item
            );
        });
    }

    const handleMinusClick = (plaid) => {
        setCarts((prev) => {

            return prev.map(item =>
                item.id === plaid.id
                    ? { ...item, counter: plaid.counter === 1 ? 1 : plaid.counter - 1 }
                    : item
            );
        });
    }

    const handleDeleteClick = (plaid) => {
        setCarts(prev => {
            return prev.filter((prev) => prev.id !== plaid.id)
        })
    }

    return (
        <div className="shoppingCart">
            <div className='container'>
                <h2 className="shoppingCart__title">Shopping cart</h2>
                <div className="shoppingCart__wrapper">
                    <TransitionGroup>
                        {plaids.map((plaid) => (
                            <CSSTransition
                                key={plaid.id}
                                nodeRef={plaid.nodeRef}
                                timeout={500}
                                classNames="item">
                                <div ref={plaid.nodeRef} key={plaid.id} className="shoppingCart__item">
                                    <div className="shoppingCart-bg">
                                        <img className='shoppingCart__img' src={plaid.img} alt={plaid.title} />
                                    </div>
                                    <div className="shoppingCart__descr">
                                        <h3 className="shoppingCart__descr-name">{plaid.title}</h3>
                                        <div className="shoppingCart__descr-params">
                                            <p className="shoppingCart__descr-size">{plaid.size}</p>
                                            <p className="shoppingCart__descr-color">{plaid.color}</p>
                                        </div>
                                    </div>
                                    <div className='card__buttons-counter'>
                                        <div
                                            onClick={() => handleMinusClick(plaid)}
                                            className='card__buttons-counter-dec'></div>
                                        <div className='card__buttons-counter-count'><span>{plaid.counter}</span></div>
                                        <div
                                            onClick={() => handlePlusClick(plaid)}
                                            className='card__buttons-counter-inc'> <span></span><span></span></div>
                                    </div>
                                    <p className="shoppingCart__price">{plaid.price}</p>
                                    <div onClick={() => handleDeleteClick(plaid)} className='cardwrapper'>
                                        <div className="shoppingCart-delete"> <span></span><span></span></div>
                                    </div>
                                </div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;