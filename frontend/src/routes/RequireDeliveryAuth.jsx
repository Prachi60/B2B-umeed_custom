import { Navigate } from 'react-router-dom'

function RequireDeliveryAuth({ children }) {
  const isDeliveryAuthenticated = localStorage.getItem('umeed-delivery-auth') === 'true';
  if (!isDeliveryAuthenticated) {
    return <Navigate to="/delivery/auth/login" replace />;
  }
  return children;
}

export default RequireDeliveryAuth
