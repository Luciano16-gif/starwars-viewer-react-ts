import { useState, useEffect } from "react";
import HamburgerMenu from "../menus/HamburgerMenu";
import TopMenu from "../menus/TopMenu";
import StarryBackground from "../customStyles/StarryBackground";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [bgRendered, setBgRendered] = useState(false);
  
  // Render the background only once on initial mount
  useEffect(() => {
    setBgRendered(true);   
  }, []);
  
  return (
    <>

      {bgRendered && <StarryBackground />}

      
      
      <div className="pt-16">
        <HamburgerMenu />
        <TopMenu />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
};
  
export default Layout;