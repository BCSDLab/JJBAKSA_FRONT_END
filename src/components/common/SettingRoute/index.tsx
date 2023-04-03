import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'store/auth';

interface Props {
  settingPage?: string;
}

export default function ProtectedRoute({ settingPage = '/setting' }: Props) {
  const auth = useAuth();

  if (auth) {
    return <Navigate to={settingPage} replace />;
  }
  return <Outlet />;
}
