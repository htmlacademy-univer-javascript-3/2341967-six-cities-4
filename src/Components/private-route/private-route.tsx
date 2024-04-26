import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppSelector } from '../../Components/hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus === String(AuthorizationStatus.Auth)
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

