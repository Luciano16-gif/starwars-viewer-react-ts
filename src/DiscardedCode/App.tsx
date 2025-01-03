import useFetch from "../components/hooks/useFetch";
import { Link } from "react-router-dom";

const App: React.FC = () => {
   const { data, loading, error } = useFetch('https://swapi.dev/api/people/');

  if (loading) return <h1 className="text-4xl min-h-screen min-w-screen bg-slate-600 text-white font-bold flex items-center justify-center" >Loading...</h1>;
  if (error) return <h1 className="text-4xl min-h-screen min-w-screen bg-slate-600 text-white font-bold flex items-center justify-center">Error: {error}</h1>;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center bg-slate-700 min-h-screen p-4 text-white">
      {
        data && (data as any).results.map(
          (element: any, index: any) => {
            return (
              <Link to={`/${index + 1}`} className="flex flex-col items-center bg-slate-600 p-4 h-full w-full rounded hover:bg-slate-800 hover:cursor-pointer" 
              key={index}>
                <h2 className="text-2xl font-bold">{element.name}</h2>
                <p className="text-lg font-bold">
                  Height: <span className="font-normal">{element.height}</span>
                </p>
                <p className="text-lg font-bold">
                  Mass: <span className="font-normal">{element.mass}</span>
                </p>
                <p className="text-lg font-bold">
                  Hair Color: <span className="font-normal">{element.hair_color}</span>
                </p>
                <p className="text-lg font-bold">
                  Skin Color: <span className="font-normal">{element.skin_color}</span>
                </p>
                <p className="text-lg font-bold">
                  Eye Color: <span className="font-normal">{element.eye_color}</span>
                </p>
              </Link>
            )
          }
        )
          
      }
    </div>
  );
}

export default App;
