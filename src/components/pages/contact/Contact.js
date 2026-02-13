import AppHeader from "../../appHeader/AppHeader"
import AppFooter from "../../appFooter/AppFooter"
import AppMap from "../../appMap/AppMap"

import "./contact.scss"

const Contact = ({ carts, slides, handleCardClick }) => {
    return (
        <>
            <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick} />
            <div className="contact">
                <div className="container">
                    <h2 className="contact__title">Contacts</h2>
                    <div className="contact__wrapper">
                        <div className="contact-shop">
                            <h3 className="contact-shop__title">WARM HEART SHOP</h3>
                            <p className="contact-shop__phone">Phone number: <span>+44 330 321 8754</span></p>
                            <p className="contact-shop__address">Address: <span>2A Craven Street, Northampton</span></p>
                            <p className="contact-shop__email">Email:<span> warmheart.shop@gmail.com</span></p>
                        </div>
                        <div className="contact-office">
                            <h3 className="contact-shop__title">WARM HEART OFFICE</h3>
                            <p className="contact-shop__phone">Phone number: <span>+44 330 321 8754</span></p>
                            <p className="contact-shop__address">Address: <span>70 Craven Street, Northampton</span></p>
                            <p className="contact-shop__email">Email:<span> warmheart.shop@gmail.com</span></p>
                        </div>
                        <AppMap />
                    </div>
                </div>
            </div>
            <AppFooter />
        </>

    )
}

export default Contact;