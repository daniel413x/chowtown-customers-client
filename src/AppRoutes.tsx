import {
  Navigate, Route, Routes,
} from "react-router-dom";
import MainLayout from "./components/layouts/main-layout/MainLayout";
import HomePage from "./pages/HomePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/user-profile" element={<span>/user-profile</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
