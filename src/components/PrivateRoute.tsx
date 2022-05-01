import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts";
import { LocalRoutes } from "../constants";

function PrivateRoute({
  children,
  isAuthRoute,
}: {
  children: JSX.Element;
  isAuthRoute?: Boolean;
}) {
  const location = useLocation();
  const {
    authState: { token },
  } = useAuth();
  if (isAuthRoute)
    return token ? <Navigate to={LocalRoutes.PROFILE_PAGE} /> : children;
  return token ? (
    children
  ) : (
    <Navigate to={LocalRoutes.LOGIN_PAGE} state={{ from: location }} replace />
  );
}

export { PrivateRoute };
