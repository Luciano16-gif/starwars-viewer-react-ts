// src/components/ApiConsumption/ListItem.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EntityProperties, ItemResponse } from '../../types/api';

interface Field {
  label: string;
  key: string;
}

interface ListItemProps {
  uid: string;
  name: string;
  url: string;
  fields: Field[];
  category: string;
  preloadedData?: { properties?: EntityProperties }; // This is because films are structured different, so its needed to use the preloaded data from showALL
}

interface ItemDetails {
  [key: string]: string | string[] | number | undefined;
  name?: string;
  title?: string;
}


// Component that fetches 
const ListItem: React.FC<ListItemProps> = ({ uid, name, url, fields, category, preloadedData }) => {
  const [itemDetails, setItemDetails] = useState<ItemDetails>((preloadedData?.properties as unknown as ItemDetails) || {});
  const [loading, setLoading] = useState(!preloadedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (preloadedData?.properties) {
      return;
    }

    const abortController = new AbortController(); // I forgot to do this before

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, { 
          signal: abortController.signal 
        });

        if (abortController.signal.aborted) return; 

        if (!response.ok) {
          setError(`Error: ${response.status} ${response.statusText}`);
          setLoading(false);
          return;
        }

        const data: ItemResponse<EntityProperties> = await response.json();
        
        if (!abortController.signal.aborted) {
          const properties = data.result?.properties || {};
          setItemDetails(properties as unknown as ItemDetails);
          setLoading(false);
        } 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          setLoading(false);
        }
      };
    };

    fetchDetails();

    return () => {
      abortController.abort(); // This is to avoid memory leaks (kinda important)
    };
  } ,[url, preloadedData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center outline outline-2 outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 h-fit w-full rounded animate-pulse">
        {/* Title skeleton */}
        <div className="h-8 bg-yellow-400/20 rounded w-3/4 mb-2"></div>
        
        {/* Field skeletons */}
        {fields.map((_, index) => (
          <div key={index} className="h-5 bg-gray-600/20 rounded w-full mb-1 mt-1"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center outline outline-2 outline-red-400 bg-[rgba(57,58,58,0.5)] p-4 h-fit w-full rounded">
        <h2 className="text-2xl font-bold text-red-400">{name}</h2>
        <p className="text-red-300">Failed to load details</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-1 bg-red-400 text-black rounded hover:bg-red-300"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render the actual item with fetched details
  return (
    <Link
      to={`/${category}/${uid}`}
      className="flex flex-col items-center outline outline-2 outline-yellow-400 bg-[rgba(57,58,58,0.5)] p-4 h-fit w-full rounded hover:bg-[rgba(95,96,96,0.5)] hover:cursor-pointer transition-all duration-200"
    >
      <h2 className="text-2xl font-bold text-yellow-400">
        {name || itemDetails?.title || "Unknown"}
      </h2>
      
      {fields.map(({ label, key }) => (
        <p className="text-lg font-bold" key={key}>
          {label}: <span className="font-normal">{itemDetails?.[key] || "N/A"}</span>
        </p>
      ))}
    </Link>
  );
}

export default ListItem;