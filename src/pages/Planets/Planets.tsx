import { Helmet } from "react-helmet-async";
import ShowAll from "../../components/ApiConsumption/ShowAll";
import { generateListSEO } from "../../utils/seo";

const Planets: React.FC = () => {
  const planetFields = [
    { label: "Rotation period: ", key: "rotation_period" },
    { label: "Orbital period", key: "orbital_period" },
    { label: "Diameter", key: "diameter" },
    { label: "Climate", key: "climate" },
    { label: "Gravity", key: "gravity" },
    //Only 5 elements so all can be shown at the same time without barely any scrolling
  ];

  const seoData = generateListSEO('planets');

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
        fields={planetFields} 
        category={"planets"}
      />
    </>
  );
};

export default Planets;