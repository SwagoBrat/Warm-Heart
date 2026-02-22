import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import usePlaidsService from "../../service/PlaidsService";
import './menuFilter.scss';

const MenuFilter = ({ filters, setFilters, slides }) => {
    const [openDropdown, setOpenDropdown] = useState('');
    const [serviceFilters, setServiceFilters] = useState({ size: [], price: [] });
    const sizeRef = useRef(null);
    const priceRef = useRef(null);

    const { getAllFilters, loading, error, clearError } = usePlaidsService();

    useEffect(() => {
        clearError();
        getAllFilters()
            .then((data) => setServiceFilters(data));
    }, []);

    const handleSelect = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setOpenDropdown('');
    };

    const removeFilter = key => {
        setFilters(prev => ({
            ...prev,
            [key]: ''
        }));
    };

    const loadingItem = () => {
        return (
            <Spinner />
        )
    };
    const errorItem = () => <ErrorMessage />;

    const renderItem = () => (
        <div className="filters">
            <div className="filters__top">
                <button onClick={() => setOpenDropdown(openDropdown === "size" ? '' : "size")}>Size ▾</button>
                <button onClick={() => setOpenDropdown(openDropdown === "price" ? '' : "price")}>Price ▾</button>
                <div className="filter__count">{slides.length} products</div>
            </div>

            <CSSTransition
                in={openDropdown === "size"}
                timeout={400}
                nodeRef={sizeRef}
                classNames='modal'
                unmountOnExit
            >
                <div className="dropdown" ref={sizeRef}>
                    {serviceFilters.size.length > 0 && serviceFilters.size.map(option => (
                        <div key={option} onClick={() => handleSelect("size", option)}>
                            {option}
                        </div>
                    ))}
                </div>
            </CSSTransition>
            <CSSTransition
                in={openDropdown === "price"}
                timeout={400}
                nodeRef={priceRef}
                classNames='modal'
                unmountOnExit
            >
                <div className="dropdown" ref={priceRef}>
                    {serviceFilters.price.length > 0 && serviceFilters.price.map(option => (
                        <div key={option} onClick={() => handleSelect("price", option)}>
                            {option}
                        </div>
                    ))}
                </div>
            </CSSTransition>

            <div className="filters__active">
                {filters.size &&
                    <div className="filter-chip">
                        {filters.size}
                        <span onClick={() => removeFilter("size")}>✕</span>
                    </div>
                }
                {filters.price &&
                    <div className="filter-chip">
                        {filters.price}
                        <span onClick={() => removeFilter("price")}>✕</span>
                    </div>
                }
            </div>
        </div>
    );

    return (
        <div className="container">
            {error && errorItem()}
            {loading && loadingItem()}
            {!error && !loading && slides.length > 0 && renderItem()}
        </div>
    );
};

export default MenuFilter;