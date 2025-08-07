import { Helmet } from "react-helmet-async";
import ShowAll from "../../components/ApiConsumption/ShowAll";
import { generateListSEO } from "../../utils/seo";

export default function Vehicles() {
  const fields = [
    { label: "Model", key: "model" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Class", key: "vehicle_class" },
    { label: "Crew", key: "crew" },
    { label: "Passengers", key: "passengers" },
  ];

  const seoData = generateListSEO('vehicles');

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
        fields={fields} 
        category="vehicles" 
      />
    </>
  );
}
