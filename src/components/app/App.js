import MainPage from "../pages/mainPage/MainPage";
import Shop from "../pages/shop/Shop";
import Contact from "../pages/contact/Contact";
import SingleForecome from "../pages/singleForcome/SingleForecome";
import Cart from "../pages/cart/Cart";

import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useState, useEffect } from "react";
import usePlaidsService from "../../service/PlaidsService";


import imgForecome1 from "../../recources/forecome/forecome.png";
import imgForecome2 from "../../recources/forecome/forecome2.png";
import imgForecome3 from "../../recources/forecome/secondPled.png";
import imgForecome4 from "../../recources/forecome/thirdPled.png";
import imgForecome5 from "../../recources/forecome/fourthPled.png";
const App = () => {
    const [carts, setCarts] = useState(() => {
        const saved = localStorage.getItem('carts');
        return saved ? JSON.parse(saved) : []
    });

    const [slides, setSlaides] = useState([]);

    const { getAllPliads } = usePlaidsService()

    const imgMap = {
        imgForecome1,
        imgForecome2,
        imgForecome3,
        imgForecome4,
        imgForecome5
    };

    useEffect(() => {
        localStorage.setItem('carts', JSON.stringify(carts))
    }, [carts])

    useEffect(() => {
        getAllPliads()
            .then((data) => data.map(item => ({
                ...item,
                img: imgMap[item.img]
            }))).then((data) => setSlaides(data))
    }, [])

    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage carts={carts} slides={slides} />} />
                <Route path='/shop' element={<Shop carts={carts} slides={slides} />} />
                <Route path="/contact" element={<Contact carts={carts} slides={slides} />} />
                <Route path="/forecome/:id" element={<SingleForecome slides={slides} carts={carts} setCarts={setCarts} />} />
                <Route path='/cart' element={<Cart carts={carts} setCarts={setCarts} slides={slides} />} />
            </Routes>
        </Router>
    )
}

export default App;