import ShowOne from "../../components/ApiConsumption/ShowOne";
import { useParams } from "react-router-dom";

const IndividualPlanets: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const individualPlanetsField = [
        { label: "Name", key: "name" },
        { label: "Diameter", key: "diameter" },
        { label: "Rotation Period", key: "rotation_period" },
        { label: "Orbital Period", key: "orbital_period" },
        { label: "Gravity", key: "gravity" },
        { label: "Population", key: "population" },
        { label: "Climate", key: "climate" },
        { label: "Terrain", key: "terrain" },
        { label: "Surface Water", key: "surface_water" },
    ];

    return (
        <ShowOne
            url={`https://www.swapi.tech/api/planets/${id}`}
            fields={individualPlanetsField}
            goBack="Planets"
        />
    );
};

export default IndividualPlanets;
