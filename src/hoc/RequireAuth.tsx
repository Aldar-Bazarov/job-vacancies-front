import { useLocation, Navigate } from "react-router-dom";

import { isAuthenticated } from "@infrastructure/axios/auth";

interface IRequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<IRequireAuthProps> = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return children;
};
