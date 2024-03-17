import { ReactNode } from "react";
import Hero from "@/components/ui/front-page/Hero";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div
      className="flex flex-col min-h-screen"
      data-testid="MainLayout"
    >
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
