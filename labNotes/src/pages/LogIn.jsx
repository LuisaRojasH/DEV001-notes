import React from "react";
import { useState } from "react";
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { logIn, loginWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(user.email, user.password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/user-disabled') {
        setError(' email has been disabled');
      } else if (error.code === 'auth/invalid-email') {
        setError('email is not valid');
      } else if (error.code === 'auth/user-not-found') {
        setError('user not found');
      } else if (error.code === 'auth/wrong-password') {
        setError('password is invalid')
      } else {
        setError(error.message);
      }
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <div className="divLogin">

        <h1 className="titleLogin">Notes</h1>



        <form className="formLogin" onSubmit={handleSubmit}>

          {error && <p className="errorLogin">{error}</p>}
          <div className="inputEmailLogin">
            <label className="labelsLogin" htmlFor='email'>Email</label>
            <input
              className="inputsLogin"
              type='email'
              name='email'
              placeholder='youremail@company.com'
              onChange={handleChange} />
          </div>

          <div className="inptuPasswordLogin">
            <label className="labelsLogin" htmlFor='password'>Password</label>
            <input
              className="inputsLogin"
              type='password'
              name='password'
              id='password'
              placeholder='******'
              onChange={handleChange} />
          </div>

          <button className="btnLogin ">LogIn</button>
        </form>
      </div>
      <div className="divOption">
      <p className="decoration">OOOOOOOOOOOOOO</p>
      <h2 className="option">O</h2>
      <p className="decoration">OOOOOOOOOOOOOO</p>
      </div>
      <div className="divGoogle">
      <button
        className="btnGoogle"
        onClick={handleGoogleSignin}>
        <FcGoogle />
      </button>
      <p className="loginGoogle">Login with Google</p>
      </div>

      <p className="links"> Dont have an account?
        <Link to="/register">
          Register
        </Link>
      </p>

    </div>
  )
}