import React from 'react';
import Header from '../../components/LayoutComponents/Header/Header';
import Footer from '../../components/LayoutComponents/Footer/Footer';

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <main style={{overflow: "hidden"}}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
