import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'store/auth';

interface Props {
  redirectPath?: string;
}

export default function AuthRoute({ redirectPath = '/' }: Props) {
  const auth = useAuth();

  if (auth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
