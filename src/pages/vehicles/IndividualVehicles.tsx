import { useParams } from "react-router-dom";
import swapiService from "../../services/swapi.service";
import ShowOne from "../../components/ApiConsumption/ShowOne";

export default function IndividualVehicles() {
  const { id } = useParams<{ id: string }>();
  const fields = [
    { label: "Model", key: "model" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Cost", key: "cost_in_credits" },
    { label: "Length", key: "length" },
    { label: "Crew", key: "crew" },
    { label: "Passengers", key: "passengers" },
    { label: "Max Speed", key: "max_atmosphering_speed" },
    { label: "Consumables", key: "consumables" },
    { label: "Cargo Capacity", key: "cargo_capacity" },
    { label: "Class", key: "vehicle_class" },
    { label: "Pilots", key: "pilots" },
    { label: "Films", key: "films" },
  ];

  return <ShowOne 
    url={swapiService.getItemUrl("vehicles", id!)} 
    goBack="vehicles" 
    fields={fields} 
  />;
}
