import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import LoadingLine from "../ui/LoadingLine";
import axios from "axios";
import ChoiceButton from "../Listing/ChoiceButton";

const Category = () => {
  const { setProgress, steps, category, setCategory } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  // const [choice, setChoice] = useState<string>("");
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;

  useEffect(() => {
    setProgress((100 / steps) * 6);
    axios
      .get(`${url}/categories`)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleContinue = () => {
    if (!category) return;
    const categoryId = categories.find((elem: any) => elem.name === category).id;
    setCategory(categoryId);
// const choiceId = categories.find((elem: any) => elem.name === choice).id;
    // sessionStorage.setItem(
    //   "Listing_details_categories",
    //   choiceId
    // );
  
    navigate("/boats-list/regions");
  };

  if (loading) return <LoadingLine />;

  return (
    <div className="w-full md:w-[500px]">
      <p className="mb-5 text-[25px] font-bold">
        {t("choose_your_boat_category")}
      </p>

      <div className="categories flex flex-wrap gap-2 lg:gap-3">
        {categories.map((feature: any, index: number) => (
          <ChoiceButton
            key={index}
            choice={feature.id}
            text={feature.name}
            value={category}
            setValue={setCategory}
            checkValue={feature.name}
          />
        ))}
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Category;
// import { useContext, useEffect, useState } from "react";
// import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
// import { useTranslation } from "react-i18next";
// import ContinueButton from "../Listing/ContinueButton";
// import { useNavigate } from "react-router-dom";
// import LoadingLine from "../ui/LoadingLine";
// import axios from "axios";
// import ChoiceButton from "../listing details/ChoiceButton";

// const Category = () => {
//   const { setProgress, steps } = useContext(ListingDetailsContext);
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState<any>([]);
//   const [selectedCategories, setSelectedFeatures] = useState<string[]>([]);
//   const url = import.meta.env.VITE_SERVER_URL_CATEGORY;

//   useEffect(() => {
//     setProgress((100 / steps) * 6);
//     axios
//       .get(`${url}/categories`)
//       .then((res) => {
//         setCategories(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleFeatureSelect = (featureId: string) => {
//     setSelectedFeatures((prevSelected) =>
//       prevSelected.includes(featureId)
//         ? prevSelected.filter((id) => id !== featureId)
//         : [...prevSelected, featureId]
//     );
//   };

//   const handleContinue = () => {
//     if (selectedCategories.length === 0) return;
//     sessionStorage.setItem(
//       "Listing_details_categories",
//       JSON.stringify(selectedCategories)
//     );
//     navigate("/boats-list/regions");
//   };

//   if (loading) return <LoadingLine />;

//   return (
//     <div className="w-full md:w-[500px]">
//       <p className="mb-5 text-[25px] font-bold">
//         {t("choose_your_boat_category")}
//       </p>

//       <div className="categories flex flex-wrap gap-2 lg:gap-3">
//         {categories.map((feature: any) => (
//           <ChoiceButton
//             key={feature.id}
//             choice={feature.id}
//             text={feature.name}
//             value={selectedCategories}
//             setValue={handleFeatureSelect}
//             checkValue={feature.id}
//           />
//         ))}
//       </div>

//       <ContinueButton onClick={handleContinue} />
//     </div>
//   );
// };

// export default Category;
