import ShowAll from "../../components/ApiConsumption/ShowAll";

const People: React.FC = () => {
    const peopleFields = [
        { label: "Height (cm)", key: "height" },
        { label: "Mass (kg)", key: "mass" },
        { label: "Hair color", key: "hair_color" },
        { label: "Skin color", key: "skin_color" },
        { label: "Eye color", key: "eye_color" },
    ];

    return (
        <ShowAll 
            url="http://www.swapi.tech/api/people/" 
            fields={peopleFields} 
        />
    );
};

export default People;