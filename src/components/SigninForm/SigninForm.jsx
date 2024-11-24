import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './SigninForm.css';

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1 className="signin-form__title">Log In</h1>
        <p className="signin-form__error-message">{message}</p>
        <div className="signin-form__field">
          <label className="signin-form__label" htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="signin-form__input"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="signin-form__field">
          <label className="signin-form__label" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="signin-form__input"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="signin-form__buttons">
          <button
            type="submit"
            className="signin-form__button"
            disabled={!formData.username || !formData.password}
          >
            Log In
          </button>
          <Link to="/" className="signin-form__link">
            <button type="button" className="signin-form__cancel-button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SigninForm;
