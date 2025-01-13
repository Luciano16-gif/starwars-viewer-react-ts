import ShowAll from "../../components/ApiConsumption/ShowAll";

const People: React.FC = () => {
    const peopleFields = [
        { label: "Birth Year", key: "birth_year" },
        { label: "Eye color", key: "eye_color" },
        { label: "Gender", key: "gender" },
        { label: "Hair color", key: "hair_color" },
        { label: "Height (cm)", key: "height" },
        //Only 5 elements so all can be shown at the same time without barely any scrolling
    ];

    return (
        <ShowAll 
            url="http://www.swapi.tech/api/people/" 
            fields={peopleFields} 
            category="people"
        />
    );
};

export default People;