import { useState, useEffect } from 'react';
import './shopppingCart.scss'
import UserService from '../../service/UserService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useNavigate } from 'react-router';

const ShoppingCart = () => {

    const { deleteUserCart, loading, error } = UserService();
    const navigate = useNavigate()

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setUserData(data);
    }, []);

    const cart = userData?.user?.cart || [];

    const updateCart = (newCart) => {
        const updated = {
            ...userData,
            user: {
                ...userData.user,
                cart: newCart
            }
        };

        setUserData(updated);
        localStorage.setItem('user', JSON.stringify(updated));
    };

    const increaseCount = (productId) => {
        const newCart = cart.map(item =>
            item.product_id === productId
                ? { ...item, count: item.count + 1 }
                : item
        );

        updateCart(newCart);
    };

    const decreaseCount = (productId) => {
        const newCart = cart.map(item =>
            item.product_id === productId
                ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
                : item
        );

        updateCart(newCart);
    };

    const handleDeleteUserCart = (plaid) => {
        deleteUserCart(userData.user._id, plaid)
            .then((data) => {
                const updatedData = {
                    ...userData,
                    user: data,
                };

                setUserData(updatedData);
                localStorage.setItem('user', JSON.stringify(updatedData));
            });
    };

    const spinnerItem = () => (
        <div className="head__spinner">
            <Spinner />
        </div>
    );

    const errorItem = () => (
        <div className="head__spinner">
            <ErrorMessage />
        </div>
    );

    return (
        <div className="shoppingCart">
            <div className='container'>
                <h2 className="shoppingCart__title">Shopping cart</h2>

                {loading && spinnerItem()}
                {error && !loading && errorItem()}

                {!loading && !error && cart.length === 0 && (
                    <div className="shoppingCart__empty">
                        <h3 className="shoppingCart__empty-title">Your cart is empty</h3>
                        <p className="shoppingCart__empty-text">
                            Looks like you haven’t added any products yet.

                        </p>
                        <button
                            className="shoppingCart__empty-btn"
                            onClick={() => navigate('/shop')} >
                            Go to shop
                        </button>
                    </div>
                )}

                {!loading && !error && cart.length > 0 && (
                    <div className="shoppingCart__wrapper">

                        {cart.map((plaid) => (
                            <div key={plaid.product_id} className="shoppingCart__item">

                                <div className="shoppingCart-bg">
                                    <img className='shoppingCart__img' src={plaid.img} alt={plaid.title} />
                                </div>

                                <div className="shoppingCart__descr">
                                    <h3 className="shoppingCart__descr-name">{plaid.name}</h3>
                                </div>

                                <div className='card__buttons-counter'>

                                    <div
                                        className='card__buttons-counter-dec'
                                        onClick={() => decreaseCount(plaid.product_id)}
                                    >
                                        <span></span>
                                    </div>

                                    <div className='card__buttons-counter-count'>
                                        <span style={{ marginRight: plaid.count >= 10 ? '11px' : '0px' }}>{plaid.count}</span>
                                    </div>

                                    <div
                                        className='card__buttons-counter-inc'
                                        onClick={() => increaseCount(plaid.product_id)}
                                    >
                                        <span></span><span></span>
                                    </div>

                                </div>

                                <p className="shoppingCart__price">${plaid.price}</p>

                                <div className='cardwrapper'>
                                    <div
                                        className="shoppingCart-delete"
                                        onClick={() => handleDeleteUserCart(plaid)}
                                    >
                                        <span></span><span></span>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default ShoppingCart;