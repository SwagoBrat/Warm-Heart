import { Link } from "react-router";

import imgForecome2 from "../../recources/forecome/forecome2.png";



import './appBlackBlock.scss'

const AppBlackBlock = () => {
    return (
        <section className="black_block">
            <div className="container">
                <div className="black_block__wrapper">
                    <div className="left">
                        <h2 className="black_block__title">Create comfort in home</h2>
                        <p className="black_block__text">A blanket is a simple and versatile thing that can make relaxing
                            after a hard
                            day's
                            work much more comfortable.</p>
                    </div>
                    <img src={imgForecome2} alt="" class="black_block__img" />
                    <div className="right">
                        <h3 className="black_block__subtitle">Sideneert</h3>
                        <div className="black_block__wrapper-text">
                            <p className="black_block__text">It is made from soft New Zealand wool, which is naturally
                                stain-repellent.
                            </p>
                            <p className="black_block__text">This bedspread is an easy way to freshen up your bedroom decor.
                                Plus,
                                it
                                can be
                                used as an extra blanket if you get cold.</p>
                            <Link to='/shop' className="black_block__btn">Go to shop</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AppBlackBlock;