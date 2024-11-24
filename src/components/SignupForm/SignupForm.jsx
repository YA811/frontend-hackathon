import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './SignupForm.css';


const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="signup-container">
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1 className="signup-form__title">Sign Up</h1>
      <p className="signup-form__error-message">{message}</p>
      <div className="signup-form__field">
        <label className="signup-form__label" htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="signup-form__input"
          value={username}
          name="username"
          onChange={handleChange}
        />
      </div>
      <div className="signup-form__field">
        <label className="signup-form__label" htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="signup-form__input"
          value={password}
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="signup-form__field">
        <label className="signup-form__label" htmlFor="confirm">Confirm Password:</label>
        <input
          type="password"
          id="confirm"
          className="signup-form__input"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className="signup-form__button"
          disabled={isFormInvalid()}
        >
          Sign Up
        </button>
        <Link to="/" className="signup-form__link">
          <button className="signup-form__cancel-button">Cancel</button>
        </Link>
      </div>
    </form>
  </main>
);
};

export default SignupForm;
