import { Link } from "react-router-dom";

const TopMenu: React.FC = () => {
  return (
    <nav 
      className="
        bg-black 
        border-b-4 border-yellow-500 
        text-yellow-400 
        p-4 
        flex 
        justify-center 
        items-center
        shadow-lg
      "
    >
      <ul className="flex flex-row space-x-6 uppercase font-semibold tracking-wider">
      <li className="hover:scale-110 transform transition-all duration-300">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:scale-110 transform transition-all duration-300">
          <Link to="/people">People</Link>
        </li>
        <li className="hover:scale-110 transform transition-all duration-300">
          <Link to="/planets">Planets</Link>
        </li>
        <li className="hover:scale-110 transform transition-all duration-300">
          <Link to="/films">Films</Link>
        </li>
        <li className="hover:scale-110 transform transition-all duration-300">
          <Link to="/starships">Starships</Link>
        </li>
        <li className="hover:scale-110 transform transition-all duration-300">
          <Link to="/vehicles">Vehicles</Link>
        </li>
        <li className="hover:scale-110 transform transition-all duration-300">
          <Link to="/species">Species</Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopMenu;
