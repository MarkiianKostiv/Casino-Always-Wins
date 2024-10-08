import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className='flex items-center w-full min-h-[100vh] flex-col bg-primary text-primary-light'>
      <Header />
      <main className='flex flex-grow flex-col w-full pt-5 pb-5 md:pl-10 md:pr-10 pl-5 pr-5 relative'>
        {children}
      </main>
      <Footer />
    </div>
  );
};
