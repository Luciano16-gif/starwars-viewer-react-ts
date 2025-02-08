import HamburgerMenu from "../menus/HamburgerMenu";
import TopMenu from "../menus/TopMenu";

interface LayoutProps {
        children: React.ReactNode;
    }

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div className="pt-16">
        <HamburgerMenu />
        <TopMenu />
        {children}
      </div>
    );
  };
  
  export default Layout;