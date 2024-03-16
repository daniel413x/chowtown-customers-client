import {
  Navigate, Route, Routes,
} from "react-router-dom";
import Layout from "./components/layouts/Layout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><span>/</span></Layout>} />
      <Route path="/user-profile" element={<span>/user-profile</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
