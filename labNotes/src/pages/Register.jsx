import React from "react";
import { useState } from "react";
import { useAuth } from '../firebase/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { SlNote } from "react-icons/sl";

export default function Register() {
  const { signUp } = useAuth();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(user.email, user.password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('email already in use');
      } else if (error.code === 'auth/invalid-email') {
        setError('email is not valid');
      } else if (error.code === 'auth/weak-password') {
        setError('password is not strong enough.');
      } else {
        setError(error.message);
      }
    }
  }

  return (
    <div className="register">
      <div className="divRegister">
        <h1 className="titleRegister"><SlNote /> Notes</h1>

        {error && <p className="errorRegister">{error}</p>}


        <form className="formRegister" onSubmit={handleSubmit}>
          <div className="inputEmailRegister">
            <label className="labelsRegister" htmlFor='email'>Email</label>
            <input
              className="inputsRegister"
              type='email'
              name='email'
              placeholder='youremail@company.com'
              onChange={handleChange} />
          </div>
          <div className="inputPasswordRegister">
            <label className="labelsRegister" htmlFor='password'>Password</label>
            <input
              className="inputsRegister"
              type='password'
              name='password'
              id='password'
              placeholder='******'
              onChange={handleChange} />
          </div>
          <button className="btnRegister">Register</button>
        </form>
      </div>
      <p className="links">Already have an Account?
        <Link to="/login" className="text-blue-700 hover:text-blue-900">
          Login
        </Link>
      </p>
    </div>


  )
}
