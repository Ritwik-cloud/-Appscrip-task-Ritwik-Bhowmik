import React, { ReactNode } from 'react';
import Navbar from '../header/navbar';
import Footer from '../footer/footer';


interface Props {
  children: ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Wrapper;