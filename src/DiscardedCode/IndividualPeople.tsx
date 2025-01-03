import { useParams, Link } from "react-router-dom";
import useFetch from "../components/hooks/useFetch";
import { Person } from "../components/types/Person";
import { Planet } from "../components/types/Planet";

const IndividualPeople = () => {
    const { id } = useParams<{ id: string }>();

    // Fetch person data
    const { data, loading, error }: any = useFetch<Person>(`http://www.swapi.tech/api/people/${id}/`);

    // Extract homeworld URL if data is available
    const homeworldUrl: string | null = data?.homeworld || null;

    // Fetch homeworld data
    const { data: worldData, loading: worldLoading, error: worldError }: { data: Planet | null, loading: boolean, error: any} = useFetch<Planet>(homeworldUrl || '');

    // Fetch films data
    //const { data: filmsData, loading: filmsLoading, error: filmsError }: any = useFetch(`https://swapi.dev/api/films/`);
    
    if (loading || worldLoading) return <h1 className="text-4xl min-h-screen min-w-screen bg-slate-600 text-white font-bold flex items-center justify-center" >Loading...</h1>;

    if (error || worldError) 
        return (
          <h1 className="text-4xl min-h-screen min-w-screen bg-slate-600 text-white font-bold flex items-center justify-center">
            Error: {error || worldError}
          </h1>
        );
    
    return (

        

        <div className="grid grid-cols-1 gap-4 justify-items-center bg-slate-700 min-h-screen p-4 text-white">
            <div className="flex flex-col items-center bg-slate-600 p-4 h-full w-full roundedhover:cursor-pointer">
                <h2 className="text-2xl font-bold">{data.name}</h2>

                <p className="text-lg font-bold">
                  Height: <span className="font-normal">{data.height}</span>
                </p>

                <p className="text-lg font-bold">
                  Mass: <span className="font-normal">{data.mass}</span>
                </p>

                <p className="text-lg font-bold">
                  Hair Color: <span className="font-normal">{data.hair_color}</span>
                </p>

                <p className="text-lg font-bold">
                  Skin Color: <span className="font-normal">{data.skin_color}</span>
                </p>

                <p className="text-lg font-bold">
                  Eye Color: <span className="font-normal">{data.eye_color}</span>
                </p>

                <p className="text-lg font-bold">
                  Birth Year: <span className="font-normal">{data.birth_year}</span>
                </p>

                <p className="text-lg font-bold">
                  Gender: <span className="font-normal">{data.gender}</span>
                </p>

                <p className="text-lg font-bold">
                    Homeworld: <span className="font-normal">{worldData?.name || 'Unknown'}</span>
                </p>

                <Link className="flex flex-col items-center text-teal-300  active:text-teal-500 hover:underline " to="/">
                    <p>Volver a la página principal</p>
                </Link>
              </div>
        </div>
    )
}

export default IndividualPeople;