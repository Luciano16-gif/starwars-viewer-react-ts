import useFetch from "../hooks/useFetch";
interface ShowName {
    url: string;
  }

const GetName: React.FC<ShowName> = ({ url }) => {
    const { data, loading, error } = useFetch(url);

    if (loading) return( <h2 className="text-2xl font-bold">Loading</h2> );
    if (error) return( <h2 className="text-2xl font-bold">Error: {error}</h2> );

    const results = (data as any)?.results || [];

    return (results.name || 'Unknown');
}

export default GetName;