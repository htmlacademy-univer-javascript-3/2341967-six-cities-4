import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute} from '../../const/const';
import { useAppSelector } from '../hooks/index';
import { getOffersLoadingStatus } from '../../store/offers-data/selectors';
import { getCurrentOfferLoadingStatus } from '../../store/current-offer-data/selectors';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading-page/loading-page';

export default function App(): JSX.Element {
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const isCurrenOfferLoading = useAppSelector(getCurrentOfferLoadingStatus);

  if (isOffersLoading || isCurrenOfferLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>

          <Route
            path={AppRoute.Root}
            element={<MainPage/>}
          />

          <Route
            path={AppRoute.Login}
            element={<LoginPage/>}
          />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage/>
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.Offer}
            element={<OfferPage/>}
          />

          <Route
            path="*"
            element={<NotFoundPage/>}
          />

        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
