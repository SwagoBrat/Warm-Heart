import MainPage from "../pages/mainPage/MainPage";
import Shop from "../pages/shop/Shop";
import Contact from "../pages/contact/Contact";
import SingleForecome from "../pages/singleForcome/SingleForecome";
import Cart from "../pages/cart/Cart";
import AboutUs from "../pages/aboutUs/AboutUs";
import Spinner from "../spinner/Spinner";
import Page404 from "../Page 404/Page404";

import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useState, useEffect, createRef, useRef } from "react";
import usePlaidsService from "../../service/PlaidsService";

import imgForecome1 from "../../recources/forecome/forecome.png";
import imgForecome2 from "../../recources/forecome/forecome2.png";
import imgForecome3 from "../../recources/forecome/secondPled.png";
import imgForecome4 from "../../recources/forecome/thirdPled.png";
import imgForecome5 from "../../recources/forecome/fourthPled.png";

const App = () => {

    const { getAllPliads, clearError, loading, error } = usePlaidsService();



    const [carts, setCarts] = useState(() => {
        const saved = localStorage.getItem("carts");
        return saved ? JSON.parse(saved) : [];
    });

    const [lastViewedIds, setLastViewedIds] = useState(() => {
        const saved = localStorage.getItem("lastViewedIds");
        return saved ? JSON.parse(saved) : [];
    })

    const cartRefs = useRef({});

    const getNodeRef = (id) => {
        if (!cartRefs.current[id]) {
            cartRefs.current[id] = createRef();
        }
        return cartRefs.current[id];
    };



    useEffect(() => {
        localStorage.setItem("carts", JSON.stringify(carts));
    }, [carts]);


    const [slides, setSlaides] = useState([]);


    useEffect(() => {
        localStorage.setItem("lastViewedIds", JSON.stringify(lastViewedIds));
    }, [lastViewedIds]);



    const handleCardClick = (id) => {
        setLastViewedIds(prev => {
            const filtered = prev.filter(itemId => itemId !== id);
            const updated = [id, ...filtered];
            return updated.slice(0, 4);
        })
    }

    const imgMap = {
        imgForecome1,
        imgForecome2,
        imgForecome3,
        imgForecome4,
        imgForecome5
    };

    useEffect(() => {
        clearError();
        getAllPliads()
            .then((data) => data.map(item => ({
                ...item,
                img: imgMap[item.img]
            }))).then((data) => setSlaides(data))
    }, [])

    return (
        <Router>
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path='/' element={<MainPage
                        carts={carts}
                        slides={slides}
                        handleCardClick={handleCardClick}
                        loading={loading}
                        error={error} />} />
                    <Route path='/shop' element={<Shop
                        handleCardClick={handleCardClick}
                        lastViewedIds={lastViewedIds}
                        carts={carts}
                        slides={slides}
                        loading={loading}
                        error={error} />} />
                    <Route path="/contact" element={<Contact
                        handleCardClick={handleCardClick}
                        carts={carts}
                        slides={slides}
                    />} />
                    <Route path="/forecome/:id" element={<SingleForecome
                        handleCardClick={handleCardClick}
                        lastViewedIds={lastViewedIds}
                        slides={slides}
                        carts={carts}
                        setCarts={setCarts}
                        loading={loading}
                        error={error} />} />
                    <Route path='/cart' element={<Cart
                        getNodeRef={getNodeRef}
                        carts={carts}
                        handleCardClick={handleCardClick}
                        setCarts={setCarts}
                        slides={slides}
                        loading={loading}
                        error={error} />} />
                    <Route />
                    <Route path="/aboutUs"
                        element={<AboutUs
                            slides={slides}
                            carts={carts}
                            handleCardClick={handleCardClick} />}></Route>
                    <Route path="*"
                        element={<Page404 />}>
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App;