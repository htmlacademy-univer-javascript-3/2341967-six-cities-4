import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute} from '../../const/const';
import { useAppSelector } from '../hooks/index';
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
  const offers = useAppSelector((state)=>state.filteredOffers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offerComments = useAppSelector((state) => state.currentOffer.comments);
  const nearbyOffers = useAppSelector((state) => state.currentOffer.nearbyOffers);
  const offerInfo = useAppSelector((state) => state.currentOffer.offerInfo);
  const isCurrenOfferDataLoading = useAppSelector((state) => state.isCurrentOfferDataLoading);

  if (isOffersDataLoading || isCurrenOfferDataLoading) {
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
            element={<MainPage offers={offers}/>}
          />

          <Route
            path={AppRoute.Login}
            element={<LoginPage/>}
          />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage offers={offers}/>
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.Offer}
            element={<OfferPage offer={offerInfo} reviews={offerComments} nearbyOffers={nearbyOffers}/>}
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
