import React, { ReactNode } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';


interface Props {
  children: ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Wrapper;