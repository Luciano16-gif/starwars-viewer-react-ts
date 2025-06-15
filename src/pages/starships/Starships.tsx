import ShowAll from "../../components/ApiConsumption/ShowAll";

const Starships: React.FC = () => {
  const starshipFields = [
    { label: "Model", key: "model" },
    { label: "Starship class", key: "starship_class" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Cost (credits)", key: "cost_in_credits" },
    { label: "Length (meters)", key: "length" },
    //Only 5 elements so all can be shown at the same time without barely any scrolling
  ];

  return (
    <ShowAll 
      url="https://www.swapi.tech/api/starships?page=1" 
      fields={starshipFields} 
      category={"starships"}
    />
  );
};

export default Starships;