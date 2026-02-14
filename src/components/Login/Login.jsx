import React, { useState } from "react";
import './Login.scss';
import toast, { Toaster } from "react-hot-toast";

export const Login = ({ onClose }) => {
    // Стан для перемикання між Sign Up та Log In
    const [isLoginView, setIsLoginView] = useState(false);
    
    // Стан для полів форми
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { placeholder, value } = e.target;
        // Оскільки в тебе немає name, орієнтуємось на placeholder або додамо name пізніше
        if (placeholder === "Username") setFormData({ ...formData, username: value });
        if (placeholder === "E-mail") setFormData({ ...formData, email: value });
        if (placeholder === "Password") setFormData({ ...formData, password: value });
    };

    const handleAuth = () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (!isLoginView) {
            // ЛОГІКА РЕЄСТРАЦІЇ
            if (!formData.email || !formData.password || !formData.username) {
                return toast.error("Заповніть усі поля!");
            }
            if (users.find(u => u.email === formData.email)) {
                return toast.error("Такий E-mail вже існує!");
            }
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            toast.success("Реєстрація успішна! Тепер увійдіть.");
            setIsLoginView(true);
        } else {
            // ЛОГІКА ЛОГІНУ
            const user = users.find(u => u.email === formData.email && u.password === formData.password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                toast.success(`Вітаємо, ${user.username}!`);
                setTimeout(() => window.location.reload(), 1000);
            } else {
                // Спливаюче вікно зверху справа, якщо користувача нема
                toast.error("Користувача не знайдено!", { position: 'top-right' });
            }
        }
    };

    return (
        <>
            <Toaster />
            <div className="backdrop" onClick={onClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modalContent">
                        <button className="closeModal" onClick={onClose}>Close</button>
                        
                        <h2 className="signUpText">{isLoginView ? "Log In" : "Sign up"}</h2>
                        
                        <form action="" className="form">
                            {/* Username ховаємо, якщо це логін */}
                            {!isLoginView && (
                                <>
                                    <label htmlFor="username" className="labelUsrname">Username</label>
                                    <input type="text" onChange={handleInputChange} className="inputUsername" placeholder="Username" />
                                </>
                            )}
                            
                            <label htmlFor="email" className="labelEmail">E-mail</label>
                            <input type="email" onChange={handleInputChange} className="inputEmail" placeholder="E-mail" />
                            
                            <label htmlFor="password" className="labelPassword">Password</label>
                            <input type="password" onChange={handleInputChange} className="inputPassword" placeholder="Password" />
                        </form>

                        <button type="button" className="buttonSignup" onClick={handleAuth}>
                            {isLoginView ? "Log In" : "Sign Up"}
                        </button>

                        <p className="linkLogin">
                            {isLoginView ? "Don't have an account? " : "Already have an account? "}
                            <span className="link" onClick={() => setIsLoginView(!isLoginView)} style={{cursor: 'pointer', color: 'blue'}}>
                                {isLoginView ? "Sign Up" : "Log In"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
