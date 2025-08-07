import { Helmet } from "react-helmet-async";
import ShowAll from "../../components/ApiConsumption/ShowAll";
import { generateListSEO } from "../../utils/seo";

const People: React.FC = () => {
  const peopleFields = [
    { label: "Birth Year", key: "birth_year" },
    { label: "Eye color", key: "eye_color" },
    { label: "Gender", key: "gender" },
    { label: "Hair color", key: "hair_color" },
    { label: "Height (cm)", key: "height" },
  ];

  const seoData = generateListSEO('people');

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
        fields={peopleFields} 
        category="people"
      />
    </>
  );
};

export default People;
