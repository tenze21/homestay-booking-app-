import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Bhutan Homestays",
  description:
    "Reserve the best homestays which meet your needs while exploring the beauty of Bhutan.",
  keywords: "tourism, bhutan, homestays, accomodation, reservation",
};

export default Meta;
