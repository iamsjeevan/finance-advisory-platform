
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
