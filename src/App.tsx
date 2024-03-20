import {
  Navigate, Route, BrowserRouter as Router, Routes,
} from "react-router-dom";
import MainLayout from "./components/layouts/main-layout/MainLayout";
import HomePage from "./pages/HomePage";
import { AUTH_CALLBACK_ROUTE } from "./lib/consts";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import Auth0ProviderWithNavigate from "./components/providers/Auth0ProviderWithNavigate";

function App() {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route
            path="/"
            element={(
              <MainLayout>
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
          <Route
            path="/user-profile"
            element={(
              <span>
                /user-profile
              </span>
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
