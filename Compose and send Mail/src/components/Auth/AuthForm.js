import { useState, useRef, useContext } from 'react';
import AuthContext from '../../Store/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate= useNavigate()
  let content=<p>All fields are required</p>

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredEmail && enteredPassword) {
      setIsFormValid(true);
    } else {
      setError(content);
      return;
    }

    setIsLoading(true);
    let url;
    if (isLogin && isFormValid) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0bGi99jsP2N_5DpKxo3k1PBVQ3c_Oa7g';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0bGi99jsP2N_5DpKxo3k1PBVQ3c_Oa7g';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        navigate('/')
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <section className="auth bg-dark text-light p-3 w-25">
      {error && <p style={{ color: 'red', textAlign: 'start' }}>*{error}</p>}
      <h1 className="text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email" className="text-light">
            Email
          </label>
          <input type="email" id="email" className="form-control col-xs-4" required ref={emailInputRef} />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-light">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control mb-2"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          {!isLoading && (
            <button className="btn btn-primary">{isLogin ? 'Login.' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className="btn btn-link toggle"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Have an account? Login'}
          </button>
        </div>
      </form>
    </section>
    </div>
  );
};

export default AuthForm;
