import { Helmet } from "react-helmet-async";
import ShowAll from "../../components/ApiConsumption/ShowAll";
import { generateListSEO } from "../../utils/seo";

const Films: React.FC = () => {
    const filmsFields = [
        { label: "Title", key: "title" },
        { label: "Episode", key: "episode_id" },
        { label: "Director", key: "director" },
        { label: "Producer", key: "producer" },
        { label: "Release Date", key: "release_date" },
    ];

    const seoData = generateListSEO('films');

    return (
        <>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <meta property="og:title" content={seoData.title} />
                <meta property="og:description" content={seoData.description} />
                <meta name="twitter:title" content={seoData.title} />
                <meta name="twitter:description" content={seoData.description} />
            </Helmet>
            
            <ShowAll 
                fields={filmsFields} 
                category={"films"}
            />
        </>
    );
};

export default Films;