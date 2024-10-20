import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useSubmit = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const username = formData.get('login');
    const password = formData.get('password');

    try {
      const response = await axios.post('http://193.233.254.138/api/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;

      console.log(response);

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('login') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };
  return {
    handleSubmit,
    validateInputs,
    passwordErrorMessage,
    emailError,
    emailErrorMessage,
    passwordError,
  };
};

export { useSubmit };
