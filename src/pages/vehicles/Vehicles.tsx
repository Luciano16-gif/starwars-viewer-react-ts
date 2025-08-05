import ShowAll from "../../components/ApiConsumption/ShowAll";

export default function Vehicles() {
  const fields = [
    { label: "Model", key: "model" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Class", key: "vehicle_class" },
    { label: "Crew", key: "crew" },
    { label: "Passengers", key: "passengers" },
  ];

  return <ShowAll 
    fields={fields} 
    category="vehicles" 
  />;
}
