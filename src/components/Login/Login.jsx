import React, { useState } from "react";
import './Login.scss';
import toast, { Toaster } from "react-hot-toast";

export const Login = ({ onClose }) => {
  const [isLoginView, setIsLoginView] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { placeholder, value } = e.target;
    if (placeholder === "Username") setFormData({ ...formData, username: value });
    if (placeholder === "E-mail") setFormData({ ...formData, email: value });
    if (placeholder === "Password") setFormData({ ...formData, password: value });
  };

  const handleAuth = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!isLoginView) {
      // Простий Sign Up без перевірок
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      toast.success("Реєстрація успішна!");
      setIsLoginView(true);
    } else {
      // Простий Log In без перевірок
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast.success(`Вітаємо, ${user.username}!`);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Користувача не знайдено!");
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
            
            <h2 className="signUpText">{isLoginView ? "Log In" : "Sign Up"}</h2>

            <form className="form">
              {!isLoginView && (
                <>
                  <label htmlFor="username" className="labelUsrname">Username</label>
                  <input type="text" placeholder="Username" className="inputUsername" onChange={handleInputChange} />
                </>
              )}

              <label htmlFor="email" className="labelEmail">E-mail</label>
              <input type="email" placeholder="E-mail" className="inputEmail" onChange={handleInputChange} />

              <label htmlFor="password" className="labelPassword">Password</label>
              <input type="password" placeholder="Password" className="inputPassword" onChange={handleInputChange} />
            </form>

            <button type="button" className="buttonSignup" onClick={handleAuth}>
              {isLoginView ? "Log In" : "Sign Up"}
            </button>

            <p className="linkLogin">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <span className="link" onClick={() => setIsLoginView(!isLoginView)} style={{ cursor: 'pointer', color: 'blue' }}>
                {isLoginView ? "Sign Up" : "Log In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
