import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import './menuFilter.scss';

const MenuFilter = ({ filters, setProductFilters, totalProductLeght, productFilters }) => {
    const [openDropdown, setOpenDropdown] = useState('');
    const sizeRef = useRef(null);
    const priceRef = useRef(null);
    const colorRef = useRef(null);

    const renderItem = () => (
        <div className="filters">
            <div className="filters__top">
                <div>
                    <button onClick={() => setOpenDropdown(openDropdown === "size" ? '' : "size")}>Size ▾</button>
                    <CSSTransition
                        in={openDropdown === "size"}
                        timeout={400}
                        nodeRef={sizeRef}
                        classNames='modal'
                        unmountOnExit
                    >
                        <div className="dropdown" ref={sizeRef}>
                            {filters.size && filters.size.map(option => (
                                <div key={option} onClick={() => setProductFilters(prev => ({
                                    ...prev,
                                    size: option
                                }), setOpenDropdown(''))} >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </CSSTransition >
                </div>
                <div>
                    <button onClick={() => setOpenDropdown(openDropdown === "price" ? '' : "price")}>Price ▾</button>

                    <CSSTransition
                        in={openDropdown === "price"}
                        timeout={400}
                        nodeRef={priceRef}
                        classNames='modal'
                        unmountOnExit
                    >
                        <div className="dropdown" ref={priceRef}>
                            {filters.price && filters.price.map(option => (
                                <div key={option} onClick={() => setProductFilters(prev => ({
                                    ...prev,
                                    price: option
                                }), setOpenDropdown(''))} >
                                    ${option}
                                </div>
                            ))}
                        </div>
                    </CSSTransition >
                </div>
                <div>
                    <button onClick={() => setOpenDropdown(openDropdown === "color" ? '' : "color")}>Color ▾</button>
                    <CSSTransition
                        in={openDropdown === "color"}
                        timeout={400}
                        nodeRef={priceRef}
                        classNames='modal'
                        unmountOnExit
                    >
                        <div className="dropdown" ref={colorRef}>
                            {filters.color.map(option => (
                                <div key={option} onClick={() => setProductFilters(prev => ({
                                    ...prev,
                                    color: option
                                }), setOpenDropdown(''))} >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </CSSTransition >
                </div>
                <div className="filter__count">{totalProductLeght} products</div>
            </div>

            <div className="filters__active">
                {productFilters.size &&
                    <div className="filter-chip" onClick={() => setProductFilters(prev => ({
                        ...prev,
                        size: ''
                    }))} >
                        {productFilters.size}
                        <span>✕</span>
                    </div>
                }
                {productFilters.price &&
                    <div className="filter-chip" onClick={() => setProductFilters(prev => ({
                        ...prev,
                        price: ''
                    }))}>
                        ${productFilters.price}
                        <span >✕</span>
                    </div>
                }
                {productFilters.color &&
                    <div className="filter-chip" onClick={() => setProductFilters(prev => ({
                        ...prev,
                        color: ''
                    }))}>
                        {productFilters.color}
                        <span >✕</span>
                    </div>
                }
            </div>
        </div >
    );

    return (
        <div className="container">
            {renderItem()}
        </div>
    );
};

export default MenuFilter;