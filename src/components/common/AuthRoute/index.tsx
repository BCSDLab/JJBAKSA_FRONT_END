import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'store/auth';

interface Props {
  redirectRoute: string;
  needAuth: boolean;
}

export default function AuthRoute({ needAuth, redirectRoute }: Props) {
  const auth = useAuth();

  if (needAuth) {
    if (auth) {
      return <Outlet />;
    } return <Navigate to={redirectRoute} replace />;
  }
  if (auth) {
    return <Navigate to={redirectRoute} replace />;
  } return <Outlet />;
}
