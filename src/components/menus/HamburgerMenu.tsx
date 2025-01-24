import { Link } from "react-router-dom";
import { useState } from "react";

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleLinkClick() {
    setIsOpen(false);
  }

  return (
    <nav className="relative md:hidden lg:hidden">
      <div className="absolute top-0 left-0 right-0 border-b-2 border-yellow-500 h-16 flex items-center px-4 z-50">
        <div className="relative w-10 h-10">

          {/* Hamburger icon */}
          <button
            className={`w-full h-full flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-in-out
              ${isOpen ? "rotate-180 scale-90" : "rotate-0 scale-100"}`}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {/* Top line */}
            <div
              className={`absolute h-[5px] bg-yellow-400 rounded-full transition-all duration-400 ease-in-out origin-center
                ${isOpen ? "w-8 rotate-45 translate-y-0" : "w-8 -translate-y-3 rotate-0"}`}
            />
            {/* Middle line */}
            <div
              className={`absolute h-[5px] bg-yellow-400 rounded-full transition-all duration-400 ease-in-out w-8
                ${isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
            />
            {/* Bottom line */}
            <div
              className={`absolute h-[5px] bg-yellow-400 rounded-full transition-all duration-400 ease-in-out origin-center
                ${isOpen ? "w-8 -rotate-45 translate-y-0" : "w-8 translate-y-3 rotate-0"}`}
            />
          </button>
        </div>

        
        <h2 className="text-2xl font-bold text-yellow-400 absolute left-1/2 transform -translate-x-1/2">
          Star Wars
        </h2>
      </div>
      <div
        className={`fixed inset-0 bg-black/95 transition-all duration-300 ease-in-out z-40 ${
          isOpen 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        onClick={handleLinkClick}
      >
        <ul className="flex flex-col items-center justify-center h-screen pt-16">
          {menuItems.map((item, index) => (
            <li key={item.href} className="hover:scale-110 transform transition-all duration-300">
              <Link
                className="text-yellow-400 hover:text-yellow-300 text-xl uppercase tracking-wider font-semibold py-4 px-4 w-full inline-block
                          transform transition-all duration-300 hover:scale-110
                          hover:bg-yellow-500/10"
                to={item.href}
              >
                {item.label}
              </Link>
              {index < menuItems.length - 1 && (
                <div className="w-24 h-px bg-yellow-500/30 mx-auto" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-black h-16 md:hidden lg:hidden" />
    </nav>
  );
};

export default HamburgerMenu;