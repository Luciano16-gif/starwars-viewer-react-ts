import ShowOne from "../../components/ApiConsumption/ShowOne"
import { useParams } from "react-router-dom";

const IndividualPeople: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const individualPeopleField = [
        { label: "Birth Year", key: "birth_year" },
        { label: "Eye color", key: "eye_color" },
        { label: "Gender", key: "gender" },
        { label: "Hair color", key: "hair_color" },
        { label: "Height (cm)", key: "height" },
        { label: "Mass (kg)", key: "mass" },
        { label: "Skin color", key: "skin_color" },
        { label: "Homeworld", key: "homeworld" },    
    ];


    return (
        <ShowOne 
            url={`http://www.swapi.tech/api/people/${id}`}
            fields={individualPeopleField}
            goBack="people"
        />  
    )
}

export default IndividualPeople;