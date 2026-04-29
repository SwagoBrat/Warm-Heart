import { useState, useEffect } from 'react';
import './orderSummary.scss'
const OrderSummary = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setUserData(data);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const data = JSON.parse(localStorage.getItem('user'));
            setUserData(data);
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const cart = userData?.user?.cart || [];

    const price = cart.reduce((sum, plaid) => {
        const price = Number(plaid.price);
        return sum + price * plaid.count;
    }, 0);

    const totalPrice = price < 300 ? price + 50 : price;

    return (
        <div className='container'>
            {cart.length > 0 && (
                <div className="orderSummary">
                    <h2 className="orderSummary__title">Order summary</h2>
                    <div className="orderSummary__wrapper">
                        <div className="orderSummary___subtotal">
                            Subtotal:<span>€{price}</span>
                        </div>
                        <div className="orderSummary__shipping">
                            Shipping:<span>{price < 300 && price ? '€50' : 'free shipping'}</span>
                        </div>
                        <div className="orderSummary__total">
                            Total: <span>€{price ? totalPrice : 0}</span>
                        </div>
                    </div>
                    <button className="orderSummary__btn">Checkout</button>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
