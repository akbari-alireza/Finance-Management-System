
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Page Not Found</div>;
};

export default PageNotFound;
