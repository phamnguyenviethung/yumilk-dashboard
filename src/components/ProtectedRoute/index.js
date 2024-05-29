import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authState = useSelector(state => state.auth);
  const nav = useNavigate();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      nav('/login');
    }
  }, [nav, authState]);

  return children;
};

export default ProtectedRoute;
