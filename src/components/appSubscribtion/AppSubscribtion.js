import { useState, useEffect } from "react";
import usePlaidsService from "../../service/PlaidsService";

import "./appSubscribtion.scss";

const AppSubscribtion = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("idle");

    const message = {
        loading: 'loading...',
        success: 'message with promocode will be sended',
        error: 'something go wrong'
    };

    const { postEmail } = usePlaidsService();

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    useEffect(() => {
        if (status === "success" || status === "error") {
            const timer = setTimeout(() => {
                setStatus("idle");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [status]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        setSubmitted(true);
        setStatus("idle");

        if (!validateEmail(email)) {
            setError(true);
            return;
        }

        setStatus("loading");

        postEmail({ email })
            .then(() => {
                setStatus("success");
                setError(false);
            })
            .catch(() => {
                setStatus("error");
            })
            .finally(() => {
                setSubmitted(false);
                setEmail("");
            });
    };

    const onChangeHandler = (e) => {
        setEmail(e.target.value);
        if (error) setError(false);
        setStatus("idle");
    };

    return (
        <section className="subscribtion">
            <div className="container">
                <div className="subscribtion__wrapper">
                    <div className="subscribtion__text">
                        <h2 className="subscribtion__title">
                            Get 20% off your first purchase
                        </h2>
                        <p className="subscribtion__subtitle">
                            Subscribe to our newsletter and get a promo code for a 20% discount!
                            You will receive only the most important and relevant news.
                        </p>
                    </div>

                    <form onSubmit={onSubmitHandler}>
                        <fieldset className="subscribtion__input">
                            <input
                                type="text"
                                placeholder="Email address"
                                name="email"
                                value={email}
                                onChange={onChangeHandler}
                                style={submitted && error ? { borderColor: "red", color: "red" } : null}
                                disabled={status === "loading"}
                            />
                        </fieldset>

                        {submitted && error && (
                            <p style={{ color: "red", marginTop: "15px", fontSize: "15px" }}>
                                Wrong email
                            </p>
                        )}

                        {status === "loading" && (
                            <p style={{ marginTop: "15px", fontSize: "15px" }}>
                                {message.loading}
                            </p>
                        )}

                        {status === "success" && (
                            <p style={{ marginTop: "15px", fontSize: "15px", color: "green" }}>
                                {message.success}
                            </p>
                        )}

                        {status === "error" && (
                            <p style={{ marginTop: "15px", fontSize: "15px", color: "red" }}>
                                {message.error}
                            </p>
                        )}

                        <button
                            className="subscribtion__btn"
                            disabled={status === "loading"}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AppSubscribtion;
