import { ReactNode } from "react";
import {
  useLocation,
} from "react-router-dom";
import Header from "../ui/Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout({
  children,
}: LayoutProps) {
  const { pathname } = useLocation();
  return (
    <div
      className="flex flex-col min-h-screen"
      data-testid="layout"
    >
      <Header />
      <div className="container mx-auto flex-1 py-10">
        {children}
      </div>
    </div>
  );
}

export default Layout;
