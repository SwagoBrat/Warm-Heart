import AppHeader from "../../appHeader/AppHeader";
import AppFooter from "../../appFooter/AppFooter";

import "./aboutUs.scss";
import { Link } from "react-router";

const AboutUs = ({ carts, slides, handleCardClick }) => {
  return (
    <>
    <AppHeader carts={carts} slides={slides} handleCardClick={handleCardClick}/>
    <section className="about">
      <div className="container">
        <div className="about__hero">
          <div className="about__left">
            <h1 className="about__title">About Warm Heart</h1>

            <p className="about__text">
              Warm Heart is a small cozy brand created for people who love comfort
              at home. We believe that a plaid is not just a piece of fabric —
              it’s a feeling of warmth, calmness and care.
            </p>

            <p className="about__text">
              Our products are inspired by Scandinavian minimalism, natural
              colors and simple design. Every plaid is selected to match modern
              interiors and to make your everyday moments softer.
            </p>

            <div className="about__buttons">
              <Link to="/shop" className="btn">
                Go to shop
              </Link>

              <Link to="/contact" className="btn">
                Contact us
              </Link>
            </div>
          </div>

          <div className="about__right">
            <div className="about__card">
              <h3 className="about__cardTitle">Our mission</h3>
              <p className="about__cardText">
                To create simple, beautiful and soft plaids that make your home
                feel warmer.
              </p>
            </div>

            <div className="about__card">
              <h3 className="about__cardTitle">Our values</h3>
              <p className="about__cardText">
                Comfort, quality, minimalism, and honest service for every
                customer.
              </p>
            </div>

            <div className="about__card">
              <h3 className="about__cardTitle">Materials</h3>
              <p className="about__cardText">
                We use durable fabrics with pleasant texture, easy care, and
                long-term softness.
              </p>
            </div>
          </div>
        </div>

        <div className="about__bottom">
          <h2 className="about__subtitle">Why people choose us</h2>

          <div className="about__grid">
            <div className="about__item">
              <h4 className="about__itemTitle">Soft & cozy</h4>
              <p className="about__itemText">
                Every plaid is selected to feel warm and comfortable from the
                first touch.
              </p>
            </div>

            <div className="about__item">
              <h4 className="about__itemTitle">Modern design</h4>
              <p className="about__itemText">
                Neutral colors and minimal patterns that fit any interior style.
              </p>
            </div>

            <div className="about__item">
              <h4 className="about__itemTitle">Fast support</h4>
              <p className="about__itemText">
                If you have questions — we always answer quickly and help you
                choose.
              </p>
            </div>

            <div className="about__item">
              <h4 className="about__itemTitle">Secure order</h4>
              <p className="about__itemText">
                Your order is processed carefully, and delivery is tracked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AppFooter/>
    </>
  );
};

export default AboutUs;
