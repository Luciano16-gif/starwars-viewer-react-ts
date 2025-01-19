import { Link } from "react-router-dom";

const TopMenu: React.FC = () => {

  interface MenuItem {
    href: string;
    label: string;
  }

  const menuItems: MenuItem[] = [
    { href: "/", label: "Home" },
    { href: "/people", label: "People" },
    { href: "/planets", label: "Planets" },
    { href: "/films", label: "Films" },
    { href: "/starships", label: "Starships" },
    { href: "/vehicles", label: "Vehicles" },
    { href: "/species", label: "Species" },
  ];

  return (
    <nav 
      className="
        hidden
        bg-black 
        border-b-4 border-yellow-500 
        text-yellow-400 
        p-4 
        md:flex 
        justify-center 
        items-center
        shadow-lg
      "
    >
      <ul className="flex flex-row space-x-6 uppercase font-semibold tracking-wider sm:space-x-8 sm:text-lg">
            {menuItems.map((item) => (
            <li key={item.href} className="hover:scale-110 transform transition-all duration-300">
                <Link to={item.href}>{item.label}</Link>
            </li>
            ))}
      </ul>
    </nav>
  );
};

export default TopMenu;
