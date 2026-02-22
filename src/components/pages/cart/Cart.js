import AppHeader from "../../appHeader/AppHeader"
import ShoppingCart from "../../shoppingCart/ShoppingCart";
import AppFooter from "../../appFooter/AppFooter"
import OrderSummary from "../../orderSummary/OrderSummary";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";

import './cart.scss'

const Cart = ({ carts, setCarts, slides, handleCardClick, getNodeRef, error, loading }) => {

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

    const errorItem = () => {
        return (
            <div className=" cart__spinner"><ErrorMessage /></div>
        )
    }

    const spinnerItem = () => {
        return (
            <div className=" cart__spinner"><Spinner /></div>
        )
    }


    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Plaids market place"
                />
                <title>Plaids shopping</title>
            </Helmet >
            <ErrorBoundary>
                <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick} />
            </ErrorBoundary>
            {error && errorItem()}
            {loading && spinnerItem()}
            {!error && !loading && slides.length > 0 && (
                <>
                    <ErrorBoundary>
                        <ShoppingCart plaids={plaids} setCarts={setCarts} />

                    </ErrorBoundary>
                    <ErrorBoundary>
                        <OrderSummary plaids={plaids} />

                    </ErrorBoundary>
                </>
            )}

            <AppFooter />
        </>
    )

}
export default Cart;