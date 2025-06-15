import useFetch from "../../hooks/useFetch";
import StarryBackground from "../customStyles/StarryBackground";
import { ArrayField } from "./ArrayField";
import { GetName } from "./GetName";
import { Link } from "react-router-dom";

interface Field {
  label: string;
  key: string;
}

interface ShowOneProp {
  url: string;
  fields: Field[];
  goBack: String;
}

interface ApiResponse {
  result: {
    properties: {
      name: string;
      [key: string]: any;
    };
  };
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
  const { data, loading, error } = useFetch<ApiResponse>(url);

  if (loading) {
    return (
      <div className="relative">
        <StarryBackground />
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
        <StarryBackground />
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
        <StarryBackground />
        <div className="min-h-screen min-w-screen bg-[#181818]">
          <h1 className="text-4xl text-yellow-400 font-bold flex items-center justify-center min-h-screen">
            No data found
          </h1>
        </div>
      </div>
    );
  }

  const renderFields = (label: string, key: string) => {
    if (Array.isArray(properties[key])) {
      return <ArrayField urls={properties[key]} label={label} key={key} />;
    } else if (isUrl(properties[key])) {
      return <GetName url={properties[key]} label={label} key={key} />;
    } else {
      return (
        <p className="text-lg font-bold" key={key}>
          {label}: <span className="font-normal">{properties[key] ?? "N/A"}</span>
        </p>
      );
    }
  };

  return (
    <div className="relative">
      <StarryBackground />
      <div className="grid grid-cols-1 justify-items-center bg-[#181818] min-h-screen p-4 text-white">
        <div className="flex flex-col mt-20 items-center outline outline-2 h-fit min-w-[30%] outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 rounded-3xl">
          {properties.name && (
            <h2 className="text-2xl font-bold text-yellow-400">{properties.name}</h2>
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