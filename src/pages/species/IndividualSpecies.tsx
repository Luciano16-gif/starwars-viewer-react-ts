import { useParams } from "react-router-dom";
import swapiService from "../../services/swapi.service";
import ShowOne from "../../components/ApiConsumption/ShowOne";

export default function IndividualSpecies() {
  const { id } = useParams<{ id: string }>();
  const fields = [
    { label: "Classification", key: "classification" },
    { label: "Designation", key: "designation" },
    { label: "Average Height", key: "average_height" },
    { label: "Average Lifespan", key: "average_lifespan" },
    { label: "Eye Colors", key: "eye_colors" },
    { label: "Hair Colors", key: "hair_colors" },
    { label: "Skin Colors", key: "skin_colors" },
    { label: "Language", key: "language" },
    { label: "Homeworld", key: "homeworld" },
    { label: "People", key: "people" },
  ];

  return <ShowOne 
    url={swapiService.getItemUrl("species", id!)} 
    goBack="species" 
    fields={fields} 
  />;
}