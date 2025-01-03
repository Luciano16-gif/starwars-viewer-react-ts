import ShowOne from "../../components/ApiConsumption/ShowOne"
import { useParams } from "react-router-dom";

const IndividualPeople: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const individualPeopleField = [
        { label: "Height (cm)", key: "height" },
        { label: "Mass (kg)", key: "mass" },
        { label: "Hair color", key: "hair_color" },
        { label: "Skin color", key: "skin_color" },
        { label: "Eye color", key: "eye_color" },
        { label: "Homeworld", key: "homeworld" },
    ];


    return (
        <ShowOne 
            url={`http://www.swapi.tech/api/people/${id}`}
            fields={individualPeopleField}
        />  
    )
}

export default IndividualPeople;