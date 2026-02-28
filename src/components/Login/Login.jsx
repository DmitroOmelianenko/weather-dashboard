import { useState } from "react";
import "./Login.scss";

export const Login = ({ onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isSignUp) {
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      onClose(); // зареєструвались і закрили
      return;
    }

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      onLogin();
      onClose();
    }
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <h2 className="signUpText">{isSignUp ? "Sign Up" : "Log In"}</h2>

        {isSignUp && (
          <>
            <label className="labelUsrname">Username</label>
            <input
              className="inputUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}

        <label className="labelEmail">E-mail</label>
        <input
          className="inputEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="labelPassword">Password</label>
        <input
          className="inputPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="buttonSignup" onClick={handleAuth}>
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <p className="linkLogin">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span className="link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Log In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};