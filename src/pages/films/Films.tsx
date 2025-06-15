import ShowAll from "../../components/ApiConsumption/ShowAll";

const Films: React.FC = () => {
    const filmsFields = [
        { label: "Title", key: "title" },
        { label: "Episode", key: "episode_id" },
        { label: "Director", key: "director" },
        { label: "Producer", key: "producer" },
        { label: "Release Date", key: "release_date" },
    ];

    return (
        <ShowAll 
            url="https://swapi.tech/api/films" 
            fields={filmsFields} 
            category={"films"}
        />
    );
};

export default Films;