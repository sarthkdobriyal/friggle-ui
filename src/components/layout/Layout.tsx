import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  isHomepage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated = false, isHomepage = false }) => {
  return (
    <>     
    <div className="min-h-screen flex flex-col  bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
     {!isHomepage && <Header isAuthenticated={isAuthenticated} />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Layout;
