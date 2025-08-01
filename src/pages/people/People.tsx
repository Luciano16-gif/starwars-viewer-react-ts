import ShowAll from "../../components/ApiConsumption/ShowAll";

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
      fields={peopleFields} 
      category="people"
    />
  );
};

export default People;
