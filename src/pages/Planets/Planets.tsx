import ShowAll from "../../components/ApiConsumption/ShowAll";

const Planets: React.FC = () => {
  const planetFields = [
    { label: "Rotation period: ", key: "rotation_period" },
    { label: "Orbital period", key: "orbital_period" },
    { label: "Diameter", key: "diameter" },
    { label: "Climate", key: "climate" },
    { label: "Gravity", key: "gravity" },
    { label: "Terrain", key: "terrain" },

  ];

  return (
    <ShowAll 
      url="https://swapi.dev/api/planets/" 
      fields={planetFields} 
    />
  );
};

export default Planets;