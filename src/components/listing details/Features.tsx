// import { useContext, useEffect, useState } from "react";
// import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
// import ContinueButton from "../Listing/ContinueButton";
// import { useNavigate } from "react-router-dom";
// import LoadingLine from "../ui/LoadingLine";
// import axios from "axios";
// import ChoiceButton from "../listing details/ChoiceButton";
// import PageName from "./PageName";
// import { useTranslation } from "react-i18next";






// const Features = () => {
//     const { setProgress, steps, selectedFeatures, setSelectedFeatures, name, desc, lat, long } = useContext(ListingDetailsContext);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [features, setFeatures] = useState<any>([]);
//     const { i18n } = useTranslation();
//     const url = import.meta.env.VITE_SERVER_URL_LISTING;

//     useEffect(() => {
//         setProgress((100 / steps) * 4);
//         const check = !name || !desc || !lat || !long
//         if (check) return navigate("/boats-list/title");
//         axios
//             .get(`${url}/admin/listing/features`)
//             .then((res) => {
//                 // console.log(res.data);
//                 setFeatures(res.data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });

//         setLoading(false);
//     }, []);

//     const handleFeatureSelect = (featureId: string) => {
//         setSelectedFeatures((prevSelected: any) =>
//             prevSelected.includes(featureId)
//                 ? prevSelected.filter((id: any) => id !== featureId)
//                 : [...prevSelected, featureId]
//         );
//     };

//     const handleContinue = () => {
//         if (selectedFeatures.length === 0) return;
//         navigate("/boats-list/images");
//     };

//     if (loading) return <LoadingLine />;


//     return (
//         <div className="w-full md:w-[700px] mt-40">
//             <PageName text="customize_features" />
//             <div className="features flex flex-wrap gap-2 lg:gap-3">
//                 {features.map((feature: any, index: number) => (
//                     <ChoiceButton
//                         key={index}
//                         choice={(index+1).toString()}
//                         // text={feature.name}
//                         text={i18n.language === "en" ? feature.name : feature.arabic_name}
//                         value={selectedFeatures}
//                         setValue={handleFeatureSelect}
//                         checkValue={feature.id}
//                     />
//                 ))}
//                 {features.map((feature: any, index: number) => (
//                     <ChoiceButton
//                         key={index}
//                         choice={(index+1).toString()}
//                         // text={feature.name}
//                         text={i18n.language === "en" ? feature.name : feature.arabic_name}
//                         value={selectedFeatures}
//                         setValue={handleFeatureSelect}
//                         checkValue={feature.id}
//                     />
//                 ))}
//                 {features.map((feature: any, index: number) => (
//                     <ChoiceButton
//                         key={index}
//                         choice={(index+1).toString()}
//                         // text={feature.name}
//                         text={i18n.language === "en" ? feature.name : feature.arabic_name}
//                         value={selectedFeatures}
//                         setValue={handleFeatureSelect}
//                         checkValue={feature.id}
//                     />
//                 ))}
//             </div>

//             <ContinueButton onClick={handleContinue} />
//         </div>
//     );
// };

// export default Features;

import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import LoadingLine from "../ui/LoadingLine";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ChoiceButton from "../listing details/ChoiceButton";
import PageName from "./PageName";
import { useTranslation } from "react-i18next";

const Features = () => {
  const {
    setProgress,
    steps,
    selectedFeatures,
    setSelectedFeatures,
    name,
    desc,
    lat,
    long,
  } = useContext(ListingDetailsContext);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  // ✅ Fetch features using useQuery
  const {
    data: features,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuresListingDetails"],
    queryFn: async () => {
      const response = await axios.get(`${url}/admin/listing/features`);
      return response.data;
    },
  });

  // ✅ Set progress and check for required fields
  useEffect(() => {
    setProgress((100 / steps) * 4);
    const array = [name, desc, lat, long];
      const check = array.some((field) => !field);
    if (check) return navigate("/boats-list/title");
  }, []);

  // ✅ Handle feature selection
  const handleFeatureSelect = (featureId: string) => {
    setSelectedFeatures((prevSelected: string[]) =>
      prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId)
        : [...prevSelected, featureId]
    );
  };

  const handleContinue = () => {
    if (selectedFeatures.length === 0) return;
    navigate("/boats-list/images");
  };

  if (isLoading) return <LoadingLine />;

  if (error) return null;

  return (
    <div className="w-full md:w-[700px] mt-40">
      <PageName text="customize_features" />
      <div className="features flex flex-wrap gap-2 lg:gap-3">
        {features.map((feature: any, index: number) => (
          <ChoiceButton
            key={feature.id}
            choice={(index + 1).toString()}
            text={i18n.language === "en" ? feature.name : feature.arabic_name}
            value={selectedFeatures}
            setValue={handleFeatureSelect}
            checkValue={feature.id}
          />
        ))}
      </div>
      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Features;
