import { Helmet } from "react-helmet-async";
import ShowAll from "../../components/ApiConsumption/ShowAll";
import { generateListSEO } from "../../utils/seo";

const Starships: React.FC = () => {
  const starshipFields = [
    { label: "Model", key: "model" },
    { label: "Starship class", key: "starship_class" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Cost (credits)", key: "cost_in_credits" },
    { label: "Length (meters)", key: "length" },
    //Only 5 elements so all can be shown at the same time without barely any scrolling
  ];

  const seoData = generateListSEO('starships');

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
        fields={starshipFields} 
        category={"starships"}
      />
    </>
  );
};

export default Starships;