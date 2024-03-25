import { ReactNode } from "react";
import Hero from "./components/Hero";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  hero?: boolean;
}

function MainLayout({
  children,
  hero,
}: MainLayoutProps) {
  return (
    <div
      className="flex flex-col min-h-screen"
      data-testid="main-layout"
    >
      <Header />
      {hero ? <Hero /> : null}
      <div className="container mx-auto flex-1 py-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
