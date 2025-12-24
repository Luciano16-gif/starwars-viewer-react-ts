import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { ItemResponse, EntityProperties } from '../../types/api';
import { GetName } from './GetName';
import { ArrayField } from './ArrayField';

interface DetailModalProps {
  url: string | null;
  onClose: () => void;
}

function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function getDisplayName(properties: EntityProperties): string {
  if ('name' in properties) {
    return properties.name;
  }
  if ('title' in properties) {
    return properties.title;
  }
  return 'Unknown';
}

let openModalCount = 0;
let previousBodyOverflow: string | null = null;

export const DetailModal: React.FC<DetailModalProps> = ({ url, onClose }) => {
  const { data, error, loading } = useFetch<ItemResponse<EntityProperties>>(url || '');
  const [nestedModalUrl, setNestedModalUrl] = useState<string | null>(null);

  const handleNestedDetailClick = (nestedUrl: string) => {
    setNestedModalUrl(nestedUrl);
  };

  const closeNestedModal = () => {
    setNestedModalUrl(null);
  };

  useEffect(() => {
    if (!url) return;

    if (openModalCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
    }
    openModalCount += 1;
    document.body.style.overflow = 'hidden';

    return () => {
      openModalCount = Math.max(0, openModalCount - 1);
      if (openModalCount === 0) {
        document.body.style.overflow = previousBodyOverflow ?? '';
        previousBodyOverflow = null;
      }
    };
  }, [url]);

  if (!url) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const properties = data?.result?.properties;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#181818] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-yellow-400/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-yellow-400/20">
          <h2 className="text-2xl font-bold text-yellow-400">
            {loading ? 'Loading...' : properties ? getDisplayName(properties) : 'Details'}
          </h2>
          <button 
            onClick={onClose}
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[rgba(57,58,58,0.3)] rounded-lg p-4 border border-yellow-400/10">
                  <div className="w-24 h-4 bg-yellow-400/20 rounded mb-2 animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-600/20 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-red-400 text-center py-8">
              <p>Error loading details: {error}</p>
            </div>
          )}

          {!loading && !error && properties && (
            <div className="space-y-4">
              {Object.entries(properties).map(([key, value]) => {
                if (key === 'created' || key === 'edited' || key === 'url') {
                  return null;
                }

                return (
                  <div key={key} className="bg-[rgba(57,58,58,0.3)] rounded-lg p-4 border border-yellow-400/10">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2 capitalize">
                      {key.replace(/_/g, ' ')}
                    </h3>
                    
                    {Array.isArray(value) ? (
                      value.every(item => isUrl(item)) ? (
                        <div className="pl-0">
                          <ArrayField urls={value} label="" onDetailClick={handleNestedDetailClick} />
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {value.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <span className="text-yellow-400 mr-2">•</span>
                              <span className="text-gray-100">{item}</span>
                            </div>
                          ))}
                        </div>
                      )
                    ) : isUrl(value as string) ? (
                      <GetName url={value as string} label="" onDetailClick={handleNestedDetailClick} />
                    ) : (
                      <p className="text-gray-100 text-lg">{value || 'N/A'}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Nested Modal */}
      {nestedModalUrl && (
        <div style={{ zIndex: 60 }}>
          <DetailModal url={nestedModalUrl} onClose={closeNestedModal} />
        </div>
      )}
    </div>
  );
};
