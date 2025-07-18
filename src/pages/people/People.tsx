import ShowAll from "../../components/ApiConsumption/ShowAll";
import swapiService from "../../services/swapi.service";

const People: React.FC = () => {
  const peopleFields = [
    { label: "Birth Year", key: "birth_year" },
    { label: "Eye color", key: "eye_color" },
    { label: "Gender", key: "gender" },
    { label: "Hair color", key: "hair_color" },
    { label: "Height (cm)", key: "height" },
  ];

  return (
    <ShowAll 
      url={swapiService.getListUrl('people', 1)}
      fields={peopleFields} 
      category="people"
    />
  );
};

export default People;
