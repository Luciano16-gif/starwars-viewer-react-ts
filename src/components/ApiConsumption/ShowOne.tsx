import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ArrayField } from "./ArrayField";
import { GetName } from "./GetName";
import { Link, useLocation } from "react-router-dom";
import { ItemResponse, EntityProperties } from "../../types/api";
import { DetailModal } from "./DetailModal";

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
  const { data,  error } = useFetch<ItemResponse<EntityProperties>>(url);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const location = useLocation();

  const handleDetailClick = (url: string) => {
    setModalUrl(url);
  };

  const closeModal = () => {
    setModalUrl(null);
  };

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

  if (!data) {
    // Show skeleton while loading
    return (
      <div className="relative bg-[#181818] min-h-screen">
        {/* Header skeleton */}
        <div className="bg-[#181818] border-b border-yellow-400/20 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-yellow-400/20 rounded mr-2 animate-pulse"></div>
              <div className="w-24 h-6 bg-yellow-400/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Title skeleton */}
          <div className="mb-8">
            <div className="w-64 h-10 bg-yellow-400/20 rounded mb-2 animate-pulse"></div>
            <div className="h-1 w-20 bg-yellow-400/20 rounded animate-pulse"></div>
          </div>

          {/* Content grid skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {fields.map((_, index) => (
              <div key={index} className="bg-[rgba(57,58,58,0.3)] rounded-lg p-6 border-2 border-yellow-400/10">
                <div className="w-32 h-6 bg-yellow-400/20 rounded mb-3 animate-pulse"></div>
                <div className="w-full h-6 bg-gray-600/20 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
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
  return (
    <div className="relative bg-[#181818] min-h-screen">
      {/* Header with back button */}
      <div className="bg-[#181818] border-b border-yellow-400/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to={`/${goBack}${location.search}`}
            className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {goBack}
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">
            {(properties as any)?.name || (properties as any)?.title || "Unknown"}
          </h1>
          <div className="h-1 w-20 bg-yellow-400 rounded"></div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-100">
          {fields.map(({ label, key }) => {
            const value = properties ? (properties as any)[key] : null;
            
            if (Array.isArray(value)) {
              return (
                <div key={key} className="lg:col-span-2">
                  <div className="bg-[rgba(57,58,58,0.3)] rounded-lg p-6 border-2 border-yellow-400/10">
                    <h3 className="text-xl font-semibold text-yellow-400 mb-4">{label}</h3>
                    <ArrayField urls={value} label={label} onDetailClick={handleDetailClick} />
                  </div>
                </div>
              );
            } else if (typeof value === 'string' && isUrl(value)) {
              return (
                <div key={key} className="bg-[rgba(57,58,58,0.3)] rounded-lg p-6 border-2 border-yellow-400/10">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">{label}</h3>
                    <GetName url={value} label={label} onDetailClick={handleDetailClick} />
                </div>
              );
            } else {
              return (
                <div key={key} className="bg-[rgba(57,58,58,0.3)] text-gray-100 rounded-lg p-6 border-2 border-yellow-400/10">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">{label}</h3>
                  <p className="text-lg font-medium">{value ?? "N/A"}</p>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal url={modalUrl} onClose={closeModal} />
    </div>
  );
};

export default ShowOne;