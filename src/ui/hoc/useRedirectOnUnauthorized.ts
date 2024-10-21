import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectOnUnauthorized = (error: Error | null) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error.message === 'Unauthorized') {
      navigate('/login', { replace: true });
    }
  }, [error, navigate]);
};

export { useRedirectOnUnauthorized };
