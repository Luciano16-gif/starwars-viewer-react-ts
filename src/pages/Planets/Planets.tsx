import ShowAll from "../../components/ApiConsumption/ShowAll";

const Planets: React.FC = () => {
  const planetFields = [
    { label: "Rotation period: ", key: "rotation_period" },
    { label: "Orbital period", key: "orbital_period" },
    { label: "Diameter", key: "diameter" },
    { label: "Climate", key: "climate" },
    { label: "Gravity", key: "gravity" },
    //Only 5 elements so all can be shown at the same time without barely any scrolling
  ];

  return (
    <ShowAll 
      url="https://www.swapi.tech/api/planets?page=1" 
      fields={planetFields} 
      category={"planets"}
    />
  );
};

export default Planets;