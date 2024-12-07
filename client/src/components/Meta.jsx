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
  description: "We have got your accomodation in check while you explore the beauty of this gifted land.",
  keywords: "homestay, reservation, bhutan, tourism",
};

export default Meta;
