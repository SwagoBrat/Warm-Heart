import AppHeader from "../../appHeader/AppHeader"
import ShoppingCart from "../../shoppingCart/ShoppingCart";
import AppFooter from "../../appFooter/AppFooter"
import OrderSummary from "../../orderSummary/OrderSummary";
import Spinner from "../../spinner/Spinner";

import './cart.scss'

const Cart = ({ carts, setCarts, slides, handleCardClick, getNodeRef }) => {

    const plaids = carts
        .map(cart => {
            const slide = slides.find(slide => slide.id === cart.id);
            return slide ? {
                ...slide,
                counter: cart.counter,
                nodeRef: getNodeRef(cart.id)
            }
                : null
        })
        .filter(Boolean);


    return (
        <>
            <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick} />
            {
                slides.length > 0 ?
                    <>
                        <ShoppingCart plaids={plaids} setCarts={setCarts} />
                        <OrderSummary plaids={plaids} />
                    </>
                    : <div className=" cart__spinner"><Spinner /></div>

            }
            <AppFooter />
        </>
    )

}
export default Cart;