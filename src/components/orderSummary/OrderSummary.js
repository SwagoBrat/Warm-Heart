import './orderSummary.scss'

const OrderSummary = ({ plaids }) => {

    const price = plaids.reduce((sum, plaid) => {
        const price = Number(plaid.price.replace(/[^\d.]/g, ""));
        return sum + price * plaid.counter;
    }, 0);

    const totalPrice = price < 300 ? price + 50 : price;
    return (
        <div className='container'>
            <div className="orderSummary">
                <h2 className="orderSummary__title">Order summary</h2>
                <div className="orderSummary__wrapper">
                    <div className="orderSummary___subtotal">Subtotal:<span>€{price}</span></div>
                    <div className="orderSummary__shipping">Shipping:<span>{totalPrice < 300 && price ? '€50' : 'free shipping'}</span></div>
                    <div className="orderSummary__total">Total: <span>€{price ? totalPrice : 0}</span></div>
                </div>
                <button className="orderSummary__btn">Checkout</button>
            </div>

        </div>
    )
}

export default OrderSummary;
