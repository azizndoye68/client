import { useState } from "react";
import axios from "axios";

const AuthPage = (props) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validateName = (name) => {
    const re = /^[a-zA-ZÀ-ÿ]+$/;
    return re.test(name);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const onLogin = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let errors = {};

    if (!validateUsername(username)) {
      formIsValid = false;
      errors["username"] = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
    }

    if (!validatePassword(secret)) {
      formIsValid = false;
      errors["secret"] = "Le mot de passe doit contenir au moins 5 caractères.";
    }

    if (formIsValid) {
      axios
        .post("http://localhost:8000/login", { username, secret })
        .then((r) => props.onAuth({ ...r.data, secret }))
        .catch((e) => console.log(JSON.stringify(e.response.data)));
    } else {
      setErrors(errors);
    }
  };

  const onSignup = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let errors = {};

    if (!validateUsername(username)) {
      formIsValid = false;
      errors["username"] = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
    }

    if (!validatePassword(secret)) {
      formIsValid = false;
      errors["secret"] = "Le mot de passe doit contenir au moins 5 caractères.";
    }

    if (!validateEmail(email)) {
      formIsValid = false;
      errors["email"] = "L'adresse email n'est pas valide.";
    }

    if (!validateName(first_name)) {
      formIsValid = false;
      errors["first_name"] = "Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux.";
    }

    if (!validateName(last_name)) {
      formIsValid = false;
      errors["last_name"] = "Le nom de famille ne doit pas contenir de chiffres ou de caractères spéciaux.";
    }

    if (formIsValid) {
      axios
        .post("http://localhost:8000/signup", {
          username,
          secret,
          email,
          first_name,
          last_name,
        })
        .then((r) => props.onAuth({ ...r.data, secret }))
        .catch((e) => console.log(JSON.stringify(e.response.data)));
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="login-page">
      <div className="card">
        {isSignup ? (
          <form onSubmit={onSignup}>
            <div className="title">Sign Up</div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="error">{errors.username}</div>}
            <input
              type="password"
              name="secret"
              placeholder="Password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            {errors.secret && <div className="error">{errors.secret}</div>}
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.first_name && <div className="error">{errors.first_name}</div>}
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.last_name && <div className="error">{errors.last_name}</div>}
            <button type="submit">SIGN UP</button>
            <div>
              <span className="info-text">Vous avez déjà un compte ? </span>
              <a href="#" onClick={() => setIsSignup(false)}>S'identifier</a>
            </div>
          </form>
        ) : (
          <form onSubmit={onLogin}>
            <div className="title">Login</div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="error">{errors.username}</div>}
            <input
              type="password"
              name="secret"
              placeholder="Password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            {errors.secret && <div className="error">{errors.secret}</div>}
            <button type="submit">LOG IN</button>
            <div>
              <span className="info-text">Vous n’avez pas de compte ? </span>
              <a href="#" onClick={() => setIsSignup(true)}>S'inscrire</a>
            </div>
          </form>
        )}
      </div>

      <style>{`
      .login-page { width: 100vw; height: 100vh; padding-top: 6vw; background: linear-gradient(180deg, rgba(117,84,160,1) 7%, rgba(117,84,160,1) 17%, rgba(106,95,168,1) 29%, rgba(99,103,174,1) 44%, rgba(87,116,184,1) 66%, rgba(70,135,198,1) 83%, rgba(44,163,219,1) 96%, rgba(22,188,237,1) 100%, rgba(0,212,255,1) 100%); }
      .card { width: 300px; position: relative; left: calc(50vw - 150px); text-align: center; padding: 20px; background-color: #f2f2f2; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
      .title { margin-bottom: 20px; font-size: 24px; font-weight: bold; color: #333; }
      input { width: calc(100% - 20px); padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
      button { background-color: #4caf50; color: white; padding: 10px 20px; margin-top: 10px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
      button:hover { background-color: #45a049; }
      .info-text { color: black; }
      a { color: #007bff; cursor: pointer; text-decoration: underline; margin-top: 15px; display: inline-block; }
      .error { color: red; font-size: 12px; margin-top: -10px; margin-bottom: 10px; text-align: left; }
      `}</style>
    </div>
  );
};

export default AuthPage;
