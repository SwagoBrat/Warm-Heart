import imgEco from '../../recources/Icon.png';

import "./appEco.scss"

const AppEco = () => {
    return (
        <section className="eco">
            <div className="container">
                <img src={imgEco} alt="icon" className="eco__logo" />
                <h2 className="eco__title">
                    We use eco-friendly materials
                </h2>
                <p className="eco__text">
                    We always care about the environment. Therefore we use only environmentally friendly and recyclable
                    materials in our production. Our blankets help to warm up on cold evenings, and also make your home even
                    more cozy.
                </p>
            </div>

        </section >
    )
}

export default AppEco;