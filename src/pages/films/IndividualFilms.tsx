import { useParams } from "react-router-dom";
import ShowOne from "../../components/ApiConsumption/ShowOne";

const IndividualFilms: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const filmFields = [
    { label: "Episode", key: "episode_id" },
    { label: "Opening Crawl", key: "opening_crawl" },
    { label: "Director", key: "director" },
    { label: "Producer", key: "producer" },
    { label: "Release Date", key: "release_date" },
    { label: "Characters", key: "characters" },
    { label: "Planets", key: "planets" },
    { label: "Starships", key: "starships" },
    { label: "Vehicles", key: "vehicles" },
    { label: "Species", key: "species" }
  ];

  return (
    <ShowOne 
      url={`https://swapi.tech/api/films/${id}`}
      fields={filmFields}
      goBack="films"
    />
  );
};

export default IndividualFilms;