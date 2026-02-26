import { useState, useEffect } from "react";
import usePlaidsService from "../../service/PlaidsService";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./appSubscribtion.scss";

const AppSubscribtion = () => {
    const { postEmail, loading, error } = usePlaidsService();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let timer;
        if (success) {
            timer = setTimeout(() => setSuccess(false), 5000);
        }
        return () => clearTimeout(timer);
    }, [success]);

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
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Wrong email').required('This field is required')
                        })}
                        onSubmit={({ email }, { resetForm }) => {
                            postEmail({ email })
                                .then(() => setSuccess(true))
                                .then(() => resetForm())
                        }}
                    >
                        <Form>
                            <fieldset className="subscribtion__input">
                                <Field
                                    type="text"
                                    placeholder="Email address"
                                    name="email"
                                />
                                <FormikErrorMessage component='div' name="email" />
                            </fieldset>
                            <button
                                type="submit"
                                disabled={loading}
                                className="subscribtion__btn"
                            >
                                Submit
                            </button>
                        </Form>
                    </Formik>
                    {error ? (
                        <div className="subscribtion__error">
                            Something went wrong. Please try again.
                        </div>
                    )
                        : null}
                    {success && (
                        <div className="subscribtion__success">
                            Email sent successfully!
                        </div>
                    )}
                </div>
            </div>
        </section >
    );
};

export default AppSubscribtion;