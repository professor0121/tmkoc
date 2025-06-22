import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/auth', { replace: true });
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-xl font-semibold text-gray-700">Logging you out...</p>
    </div>
  );
};

export default LogoutPage;
