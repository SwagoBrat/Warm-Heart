import img1 from '../../recources/1.png'
import img2 from '../../recources/2.png'
import img3 from '../../recources/3.png'


import "./appInst.scss"

const AppInst = () => {
    return (
        <section className="inst">
            <div className="container">
                <h2 className="inst__title">Follow us on instagram</h2>
                <div className="inst__wrapper">
                    <div className="inst__block">
                        <img className="inst__img" src={img1} alt="" />
                        <h3 className="inst__subtitle">@warm.heart</h3>
                        <p className="inst__text">On our Instagram, we regularly share the most interesting news. We also tell
                            you about all our new products.</p>
                    </div>
                    <div className="inst__block">
                        <img className="inst__img" src={img2} alt="" />
                        <h3 className="inst__subtitle">@warm.heart</h3>
                    </div>
                    <div className="inst__block">
                        <img className="inst__img" src={img3} alt="" />
                        <h3 className="inst__subtitle">@warm.heart</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AppInst;