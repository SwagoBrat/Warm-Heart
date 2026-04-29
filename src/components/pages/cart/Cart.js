import AppHeader from "../../appHeader/AppHeader"
import ShoppingCart from "../../shoppingCart/ShoppingCart";
import AppFooter from "../../appFooter/AppFooter"
import OrderSummary from "../../orderSummary/OrderSummary";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router';

import './cart.scss'

const Cart = () => {

    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    const navigate = useNavigate();

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
                <AppHeader />
            </ErrorBoundary>
            <>
                {
                    userData?.user?.cart.length >= 0 ? (
                        <>
                            <ErrorBoundary>
                                <ShoppingCart userData={userData} />
                            </ErrorBoundary>
                            <ErrorBoundary>
                                <OrderSummary />
                            </ErrorBoundary>
                        </>
                    ) : navigate('/userProfile')
                }
            </>
            <AppFooter />
        </>
    )

}
export default Cart;