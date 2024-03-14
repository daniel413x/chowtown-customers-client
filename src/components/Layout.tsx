import { Navigate, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="flex" data-testid="layout">
      <pre>
        {pathname === "/" && <Navigate to="/" />}
        <Outlet />
      </pre>
    </div>
  );
}

export default Layout;
