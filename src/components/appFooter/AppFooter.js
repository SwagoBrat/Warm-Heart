import { useState } from 'react';


import './appFooter.scss'

const AppFooter = () => {

    const [activeInfo, setActiveInfo] = useState(false);
    const [activeService, setActiveService] = useState(false)
    const [activeUseful, setActiveUseful] = useState(false)

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__container">
                    <div className="footer__social">
                        <h2 className="footer__social-title">warm heart</h2>
                        <nav className="footer__social-nav">
                            <ul>
                                <li><span className="icon-facebook"></span></li>
                                <li> <span className="icon-instagram"></span></li>
                                <li> <span className="icon-pinterest-circled"></span></li>
                            </ul>
                        </nav>
                        <div className="undertext">
                            <p>© WARM HEART 2025</p>
                            <p>Privacy policy</p>
                        </div>
                    </div>
                    <div className="accordion">
                        <div className="accordion-item">
                            <div className="accordion-header"
                                onClick={() => setActiveInfo(activeInfo === true ? null : true)}
                            >
                                Info <span style={{
                                    transform: activeInfo ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.4s ease'
                                }}>▶</span>
                            </div>
                            <div className={activeInfo ? "accordion-content accordion-content__open" : 'accordion-content'}>
                                <a href="#">About us</a>
                                <a href="#">Contact</a>
                                <a href="#">Shop</a>
                                <a href="#">FAQ</a>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <div className="accordion-header"
                                onClick={() => setActiveService(activeService === true ? null : true)}
                            >
                                Customer service <span style={{
                                    transform: activeService ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.4s ease'
                                }}>▶</span>
                            </div>
                            <div className={activeService ? "accordion-content accordion-content__open" : 'accordion-content'}>
                                <a href="#">Delivery and pickup</a>
                                <a href="#">Payment</a>
                                <a href="#">Exchange and return</a>
                                <a href="#">Help</a>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <div className="accordion-header"
                                onClick={() => setActiveUseful(activeUseful === true ? null : true)}
                            >
                                Useful information <span style={{
                                    transform: activeUseful ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.4s ease'
                                }}>▶</span>
                            </div>
                            <div className={activeUseful ? "accordion-content accordion-content__open" : 'accordion-content'}>
                                <a href="#">Suppliers</a>
                                <a href="#">Buying guides</a>
                                <a href="#">Principle of operation</a>
                                <a href="#">Press service</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer__info">
                        <nav>
                            <h3>Info</h3>
                            <ul>
                                <li>About us</li>
                                <li>Contacts</li>
                                <li>Shop</li>
                                <li>FAQ</li>
                            </ul>
                        </nav>
                    </div>
                    <div className="footer__customers">
                        <nav>
                            <h3>Customer service</h3>
                            <ul>
                                <li>Delivery and pickup</li>
                                <li>Payment</li>
                                <li>Exchange and return</li>
                                <li>Help</li>
                            </ul>
                        </nav>
                    </div>
                    <div className="footer__useful">
                        <nav>
                            <h3>Useful information</h3>
                            <ul>
                                <li>Suppliers</li>
                                <li>Buying guides</li>
                                <li>Principle of operation</li>
                                <li>Press service</li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="undertext">
                    <p>© WARM HEART 2025</p>
                    <p>Privacy policy</p>
                </div>
            </div>
        </footer >
    )
}

export default AppFooter;