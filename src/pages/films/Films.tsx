import ShowAll from "../../components/ApiConsumption/ShowAll";

const Films: React.FC = () => {
    const filmsFields = [
        { label: "Director", key: "director" },
        //Only 5 elements so all can be shown at the same time without scrolling
    ];

    return (
        <ShowAll 
            url="https://swapi.tech/api/films?page=1" 
            fields={filmsFields} 
            category={"films"}
        />
    );
};

export default Films;