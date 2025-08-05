import ShowAll from "../../components/ApiConsumption/ShowAll";

export default function Species() {
  const fields = [
    { label: "Classification", key: "classification" },
    { label: "Designation", key: "designation" },
    { label: "Language", key: "language" },
    { label: "Average Height", key: "average_height" },
    { label: "Average Lifespan", key: "average_lifespan" },
  ];

  return <ShowAll 
    fields={fields} 
    category="species" 
  />;
}