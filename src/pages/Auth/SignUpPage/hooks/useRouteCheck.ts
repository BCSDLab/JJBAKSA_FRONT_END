import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type RouteCheckValue = {
  [key: string]: boolean
};

const useRouteCheck = (checkValue: string, route: string) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as RouteCheckValue;
    if (!state || !(checkValue in state)) {
      navigate(route, { replace: true });
    }
  }, [location.state, navigate, route, checkValue]);
};

export default useRouteCheck;
