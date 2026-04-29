import MainPage from "../pages/mainPage/MainPage";
import Shop from "../pages/shop/Shop";
import Contact from "../pages/contact/Contact";
import SingleForecome from "../pages/singleForcome/SingleForecome";
import Cart from "../pages/cart/Cart";
import AboutUs from "../pages/aboutUs/AboutUs";
import Spinner from "../spinner/Spinner";
import Page404 from "../Page 404/Page404";
import Profile from '../pages/userProfile/UserProfile';

import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";

const App = () => {
    return (
        <Router>
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path='/userProfile' element={<Profile />} />
                    <Route path="/forecome/:id" element={<SingleForecome />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route />
                    <Route path="/aboutUs" element={<AboutUs />}></Route>
                    <Route path="*" element={<Page404 />}></Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;