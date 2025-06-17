import useFetch from "../../hooks/useFetch";
import { ArrayField } from "./ArrayField";
import { GetName } from "./GetName";
import { Link } from "react-router-dom";
import { ItemResponse, EntityProperties } from "../../types/api";

interface Field {
  label: string;
  key: string;
}

interface ShowOneProp {
  url: string;
  fields: Field[];
  goBack: String;
}

function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

const ShowOne: React.FC<ShowOneProp> = ({ url, fields, goBack }) => {
  const { data, loading, error } = useFetch<ItemResponse<EntityProperties>>(url);

  if (loading) {
    return (
      <div className="relative">

        <div className="min-h-screen min-w-screen bg-[#181818]">
          <h1 className="text-4xl text-yellow-400 font-bold flex items-center justify-center min-h-screen">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">

        <div className="min-h-screen min-w-screen bg-[#181818]">
          <h1 className="text-4xl text-yellow-400 font-bold flex items-center justify-center min-h-screen">
            Error: {error}
          </h1>
        </div>
      </div>
    );
  }

  const properties = data?.result?.properties;

  if (!properties) {
    return (
      <div className="relative">

        <div className="min-h-screen min-w-screen bg-[#181818]">
          <h1 className="text-4xl text-yellow-400 font-bold flex items-center justify-center min-h-screen">
            No data found
          </h1>
        </div>
      </div>
    );
  }

  const renderFields = (label: string, key: string) => {
    const value = properties ? (properties as any)[key] : null;
    
    if (Array.isArray(value)) {
      return <ArrayField urls={value} label={label} key={key} />; // To show names in an array of urls
    } else if (typeof value === 'string' && isUrl(value)) {
      return <GetName url={value} label={label} key={key} />; // To show name in a single url
    } else {
      return ( // To show any other field
        <p className="text-lg font-bold" key={key}>
          {label}: <span className="font-normal">{value ?? "N/A"}</span> 
        </p>
      );
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 justify-items-center bg-[#181818] min-h-screen p-4 text-white">
        <div className="flex flex-col mt-20 items-center outline outline-2 h-fit min-w-[30%] outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 rounded-3xl">
          {((properties as any)?.name || (properties as any)?.title) && (
            <h2 className="text-2xl font-bold text-yellow-400">{(properties as any).name || (properties as any).title || "Unknown"}</h2>
          )}

          {fields.map(({ label, key }) => renderFields(label, key))}
          <p className="text-lg font-bold text-yellow-400 hover:scale-110 transform transition-all duration-300" >
                 <Link to={`/${goBack}`}>Return to {goBack}</Link>
              </p>
        </div>
      </div>
    </div>
  );
};

export default ShowOne;