import { User } from 'api/user/entity';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  auth: User | null;
  redirectPath?: string;
}

export default function ProtectedRoute({
  auth,
  redirectPath = '/',
}: Props) {
  if (auth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
