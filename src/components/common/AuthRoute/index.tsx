import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'store/auth';

interface Props {
  loginPage?: string;
}

export default function AuthRoute({ loginPage = '/login' }: Props) {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to={loginPage} replace />;
  }
  return <Outlet />;
}
