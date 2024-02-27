import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../../const/const';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginScreen from '../../pages/login-page/login-page';
import OfferScreen from '../../pages/offer-page/offer-page';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';


type AppProps = {
  placesCount: number;
}

function App({ placesCount }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path={AppRoute.Root}
            element={<MainScreen placesCount={placesCount}/>}
          />

          <Route
            path={AppRoute.Login}
            element={<LoginScreen/>}
          />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesPage/>
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.Offer}
            element={<OfferScreen/>}
          />

          <Route
            path="*"
            element={<NotFoundScreen/>}
          />

        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );

}

export default App;
