import { useState, useEffect } from "react";
import usePlaidsService from "../../service/PlaidsService";

import './menuFilter.scss';

const MenuFilter = ({ filters, setFilters, slides }) => {
    const [openDropdown, setOpenDropdown] = useState('');
    const [serviceFilters, setServiceFilters] = useState([])

    const { getAllFilters } = usePlaidsService()


    useEffect(() => {
        getAllFilters()
            .then((data) => setServiceFilters(data))
    }, [])



    const handleSelect = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setOpenDropdown(null);
    };

    const removeFilter = key => {
        setFilters(prev => ({
            ...prev,
            [key]: ''
        }));
    };

    return (
        <div className="container">
            <div className="filters">
                <div className="filters__top">
                    <button onClick={() => setOpenDropdown(openDropdown === "size" ? null : "size")}>Size ▾</button>
                    <button onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}>Price ▾</button>
                    <div className="filter__count">{slides.length} products</div>
                </div>

                {openDropdown === "size" ?
                    <div className="dropdown">
                        {serviceFilters.size.map(option => (
                            <div key={option} onClick={() => handleSelect("size", option)}>
                                {option}
                            </div>
                        ))}
                    </div>
                    : null
                }
                {openDropdown === "price" ?
                    <div className="dropdown">
                        {serviceFilters.price.map(option => (
                            <div key={option} onClick={() => handleSelect("price", option)}>
                                {option}
                            </div>
                        ))}
                    </div>
                    : null
                }

                <div className="filters__active">
                    {filters.size ?
                        <div className="filter-chip">
                            {filters.size}
                            <span onClick={() => removeFilter("size")}>✕</span>
                        </div>
                        : null
                    }
                    {filters.price ?
                        <div className="filter-chip">
                            {filters.price}
                            <span onClick={() => removeFilter("price")}>✕</span>
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    );
};

export default MenuFilter;
