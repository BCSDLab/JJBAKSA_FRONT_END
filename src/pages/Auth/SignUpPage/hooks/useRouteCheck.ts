import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useRouteCheck = (checkValue: string, route: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as any;
    if (!state || !(checkValue in state)) {
      navigate(route);
    }
  }, [location.state, navigate, route, checkValue]);
};
//

export default useRouteCheck;
