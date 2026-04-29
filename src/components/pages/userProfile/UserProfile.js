import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./userProfile.scss";
import AppHeader from '../../appHeader/AppHeader';
import AppFooter from "../../appFooter/AppFooter";
import UserService from '../../../service/UserService';
import Spinner from '../../spinner/Spinner';

const Profile = () => {
    const { loading, register, login, error } = UserService();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!isLoginMode && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const { email, password } = formData;

        if (isLoginMode) {
            login({ email, password })
                .then((data) => {

                    localStorage.setItem("user", JSON.stringify(data)); // ✅ фікс
                    setIsLoggedIn(true);
                    setUser(data);
                })
                .catch(() => {
                    setErrors({ general: "Email or password error" });
                });
        } else {
            register({ email, password })
                .then((data) => {

                    localStorage.setItem("user", JSON.stringify(data)); // ✅ фікс
                    setIsLoggedIn(true);
                    setUser(data);
                })
                .catch(() => {
                    setErrors({ general: "Registration error. Please try again." });
                });
        }
    };

    const loadingItem = () => <Spinner />;

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
    };

    if (loading) {
        return (
            <>
                <AppHeader />
                <Spinner />
                <AppFooter />
            </>
        );
    }

    // ❌ НЕ залогінений
    if (!isLoggedIn) {
        return (
            <>
                <AppHeader />
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__form-wrapper">

                            <div className="profile__info-message">
                                <svg className="profile__info-icon" width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                                <span>Please sign in or create an account to access all features</span>
                            </div>

                            <div className="profile__tabs">
                                <button
                                    className={`profile__tab ${isLoginMode ? "profile__tab-active" : ""}`}
                                    onClick={() => {
                                        setIsLoginMode(true);
                                        setErrors({});
                                        setFormData({ email: "", password: "", confirmPassword: "" });
                                    }}
                                >
                                    Sign In
                                </button>

                                <button
                                    className={`profile__tab ${!isLoginMode ? "profile__tab-active" : ""}`}
                                    onClick={() => {
                                        setIsLoginMode(false);
                                        setErrors({});
                                        setFormData({ email: "", password: "", confirmPassword: "" });
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>

                            <form className="profile__form" onSubmit={handleSubmit}>
                                {errors.general && (
                                    <div className="profile__error profile__error-general">
                                        {errors.general}
                                    </div>
                                )}

                                <div className="profile__field">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`profile__input ${errors.email ? "profile__input-error" : ""}`}
                                        placeholder="Email"
                                    />
                                </div>

                                <div className="profile__field">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`profile__input ${errors.password ? "profile__input-error" : ""}`}
                                        placeholder="Password"
                                    />
                                </div>

                                {!isLoginMode && (
                                    <div className="profile__field">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`profile__input ${errors.confirmPassword ? "profile__input-error" : ""}`}
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                )}

                                <button type="submit" className="profile__submit-btn">
                                    {isLoginMode ? "Sign In" : "Create Account"}
                                </button>
                            </form>

                        </div>
                    </div>
                </section>
                <AppFooter />
            </>
        );
    }

    return (
        <>
            <AppHeader />
            {loading && !error && loadingItem()}

            {!loading && !error && user && (
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__content">

                            <div className="profile__header">
                                <h1 className="profile__title">My Profile</h1>
                                <button onClick={handleLogout} className="profile__logout-btn">
                                    Sign Out
                                </button>
                            </div>

                            <div className="profile__info">
                                <div className="profile__avatar">
                                    <div className="profile__avatar-circle">
                                        {user.user?.email?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                </div>

                                <div className="profile__details">
                                    <div className="profile__detail-item">
                                        <span className="profile__detail-label">Email:</span>
                                        <span className="profile__detail-value">
                                            {user.user?.email}
                                        </span>
                                    </div>

                                    <div className="profile__detail-item">
                                        <span className="profile__detail-label">Member since:</span>
                                        <span className="profile__detail-value">
                                            {user.user?.createdAt?.slice(0, 10) || "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="profile__orders">
                                <h2 className="profile__section-title">Order History</h2>
                                <div className="profile__orders-list">
                                    <p className="profile__empty-message">
                                        You haven't placed any orders yet.
                                        <br />
                                        <button
                                            onClick={() => navigate("/shop")}
                                            className="profile__shop-link"
                                        >
                                            Start Shopping →
                                        </button>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}
            <AppFooter />
        </>
    );
};

export default Profile;