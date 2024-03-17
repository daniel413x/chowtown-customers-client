import {
  Navigate, Route, BrowserRouter as Router, Routes,
} from "react-router-dom";
import MainLayout from "./components/layouts/main-layout/MainLayout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
