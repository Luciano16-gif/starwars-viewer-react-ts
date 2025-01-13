import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import StarryBackground from "../customStyles/StarryBackground";
import TopMenu from "../menus/topMenu";

interface Field {
  label: string;
  key: string;
}

interface ShowAllProps {
  url: string;       
  fields: Field[];   
  category: String;
}

const ShowAll: React.FC<ShowAllProps> = ({ url, fields, category }) => {
  const { data, loading, error } = useFetch(url);

  const [details, setDetails] = useState<Record<string, Record<string, any>>>({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Use useMemo so we only recompute `results` when `data` changes
  const results = useMemo(() => {
    return (data as any)?.results || [];
  }, [data]);

  useEffect(() => {
    if (!results.length) return;

    setLoadingDetails(true);

    const fetchAllDetails = async () => {
      try {
        const detailPromises = results.map(async (object: any) => {
          const response = await fetch(object.url);
          const json = await response.json();
          return {
            uid: object.uid,
            properties: json.result.properties || {},
          };
        });

        const resolvedDetails = await Promise.all(detailPromises);

        const detailsMap: Record<string, Record<string, any>> = {};
        resolvedDetails.forEach((item) => {
          detailsMap[item.uid] = item.properties;
        });

        setDetails(detailsMap);
      } catch (err) {
        console.error("Error fetching object details:", err);
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchAllDetails();
  }, [results]);

  console.log(details);

  if (loadingDetails || loading) {
    return (
      <div className="relative">
        <StarryBackground />
        <h1 className="text-4xl min-h-screen bg-[#181818] min-w-screen text-yellow-400 font-bold flex items-center justify-center">
          Loading...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <StarryBackground />
        <TopMenu />
        <h1 className="text-4xl bg-[#181818] min-h-screen min-w-screen text-yellow-400 font-bold flex items-center justify-center">
          Error: {error}
        </h1>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <StarryBackground />
      <TopMenu />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center bg-[#181818] min-h-screen p-4 text-white">
        {results.map((object: any) => {
          const objectDetails = details[object.uid] || {};

          return (
            <Link
              to={`/${category}/${object.uid}`}
              className="flex flex-col items-center outline outline-2 outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 h-fit w-full rounded hover:bg-[rgba(95,96,96,0.5)] hover:cursor-pointer"
              key={object.uid}
            >
              <h2 className="text-2xl font-bold text-yellow-400">
                {object.name ?? object.title ?? "Unknown"}
              </h2>

              {fields.map(({ label, key }) => (
                <p className="text-lg font-bold" key={key}>
                  {label}: <span className="font-normal">{objectDetails[key] ?? "N/A"}</span>
                </p>
              ))}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAll;
