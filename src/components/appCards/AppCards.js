import { useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Link } from "react-router";


import "./appCards.scss";
import UserService from '../../service/UserService';

const AppCards = ({ products }) => {
    const nodeRef = useRef(null);
    const duration = 300;
    const transitionKey = products?.length;
    const { updateUserLastViewed } = UserService();
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const id = storedUser?.user?._id;

    const handleAddLastViewed = (img, productId) => {
        updateUserLastViewed(id, { img, productId })
            .then((data) => {
                const updatedData = {
                    ...JSON.parse(localStorage.getItem('user')),
                    user: data,
                };

                localStorage.setItem('user', JSON.stringify(updatedData));
            })
            .catch(console.error);
    };
    return (
        <div className="cards">
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={transitionKey}
                    nodeRef={nodeRef}
                    timeout={duration}
                    classNames="cards-anim"
                    appear={true}
                    enter={true}
                >
                    <div className="container" ref={nodeRef}>
                        <div className="cards__wrapper">
                            {products?.[0]?.length ? (products[0].map((item, i) => (
                                <Link key={i}
                                    to={`/forecome/${item._id}`}
                                    className="cards__link"
                                    onClick={() => handleAddLastViewed(item.images[0], item._id)}>
                                    <div className="cards-slide"
                                    >
                                        <div className="cards__bg">
                                            <img src={item.images[0]} alt={item.name} />
                                        </div>
                                        <h3 className="cards__title">{item.name}</h3>
                                        <div className="cards__parametrs">
                                            <p>{item.size}</p>
                                            <p>${item.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            ) : (
                                <div>Немає товарів за обраними фільтрами</div>

                            )}
                        </div>
                    </div>
                </CSSTransition>
            </SwitchTransition>

        </div>
    );
};
export default AppCards;


