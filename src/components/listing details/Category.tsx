import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import LoadingLine from "../ui/LoadingLine";
import axios from "axios";
import ChoiceButton from "../Listing/ChoiceButton";
import PageName from "./PageName";
import { useTranslation } from "react-i18next";



const Category = () => {
  const { setProgress, steps, category, setCategory, name, desc, lat, long, selectedFeatures, selectedImages } = useContext(ListingDetailsContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;
  const { i18n } = useTranslation();

  useEffect(() => {
    const check = !name || !desc || !lat || !long || selectedFeatures.length === 0 || selectedImages.length < 5;
    if (check) return navigate("/boats-list/title");
    setProgress((100 / steps) * 6);
    // setCategories(categorriesDummy);
    setLoading(false);
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
  // console.log(category);

  const handleContinue = () => {
    if (!category) return;
    navigate("/boats-list/regions");
  };

  if (loading) return <LoadingLine />;

  return (
    <div className="w-full md:w-[500px]">
      <PageName text="choose_your_boat_category" />
      <div className="categories flex flex-wrap gap-2 lg:gap-3">
        {categories.map((feature: any, index: number) => (
          <ChoiceButton
            key={index}
            choice={(index+1).toString()}
            text={i18n.language === "en" ? feature.name : feature.arabic_name}
            value={category}
            setValue={setCategory}
            checkValue={feature.name}
            id={feature.id}
          />
        ))}
      </div>

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Category;

// const categorriesDummy = [
//   {
//     id: 10,
//     name: "Category 1",
//   },
//   {
//     id: 20,
//     name: "Category 2",
//   },
//   {
//     id: 30,
//     name: "Category 3",
//   },
//   {
//     id: 40,
//     name: "Category 4",
//   },
//   {
//     id: 50,
//     name: "Category 5",
//   }
// ]