import {
  Navigate, Route, BrowserRouter as Router, Routes,
} from "react-router-dom";
import MainLayout from "./components/layouts/main-layout/MainLayout";
import HomePage from "./pages/home-page/HomePage";
import { AUTH_CALLBACK_ROUTE, SEARCH_ROUTE, USER_PROFILE_ROUTE } from "./lib/consts";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import Auth0ProviderWithNavigate from "./components/providers/Auth0ProviderWithNavigate";
import UserProfilePage from "./pages/user-profile/UserProfilePage";
import ProtectedRoute from "./components/misc/ProtectedRoute";
import SearchPage from "./pages/search/SearchPage";

function App() {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route
            path="/"
            element={(
              <MainLayout hero>
                <HomePage />
              </MainLayout>
            )}
          />
          <Route
            path={`/${AUTH_CALLBACK_ROUTE}`}
            element={(
              <AuthCallbackPage />
            )}
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path={`/${USER_PROFILE_ROUTE}`}
              element={(
                <MainLayout>
                  <UserProfilePage />
                </MainLayout>
            )}
            />
          </Route>
          <Route
            path={`/${SEARCH_ROUTE}/:city`}
            element={(
              <MainLayout>
                <SearchPage />
              </MainLayout>
            )}
          />
          <Route
            path="*"
            element={(
              <Navigate
                to="/"
              />
            )}
          />
        </Routes>
      </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;
