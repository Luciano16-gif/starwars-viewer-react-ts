import { Helmet } from "react-helmet-async";
import ShowAll from "../../components/ApiConsumption/ShowAll";
import { generateListSEO } from "../../utils/seo";

export default function Species() {
  const fields = [
    { label: "Classification", key: "classification" },
    { label: "Designation", key: "designation" },
    { label: "Language", key: "language" },
    { label: "Average Height", key: "average_height" },
    { label: "Average Lifespan", key: "average_lifespan" },
  ];

  const seoData = generateListSEO('species');

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
        category="species" 
      />
    </>
  );
}