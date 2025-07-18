import ShowOne from "../../components/ApiConsumption/ShowOne";
import { useParams } from "react-router-dom";
import swapiService from "../../services/swapi.service";

const IndividualStarships: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const individualStarshipsField = [
        { label: "Model", key: "model" },
        { label: "Starship Class", key: "starship_class" },
        { label: "Manufacturer", key: "manufacturer" },
        { label: "Cost in Credits", key: "cost_in_credits" },
        { label: "Length", key: "length" },
        { label: "Crew", key: "crew" },
        { label: "Passengers", key: "passengers" },
        { label: "Max Atmosphering Speed", key: "max_atmosphering_speed" },
        { label: "Hyperdrive Rating", key: "hyperdrive_rating" },
        { label: "MGLT", key: "MGLT" },
        { label: "Cargo Capacity", key: "cargo_capacity" },
        { label: "Consumables", key: "consumables" },
        { label: "Pilots", key: "pilots" },
    ];

    return (
        <ShowOne
            url={swapiService.getItemUrl('starships', id!)}
            fields={individualStarshipsField}
            goBack="starships"
        />
    );
};

export default IndividualStarships;
