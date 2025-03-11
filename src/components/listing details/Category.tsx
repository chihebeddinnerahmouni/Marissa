import { useContext, useEffect } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import LoadingLine from "../ui/LoadingLine";
import axios from "axios";
import ChoiceButton from "../Listing/ChoiceButton";
import PageName from "./PageName";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const fetchCategories = async () => {
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;
  const res = await axios.get(`${url}/categories`);
  return res.data;
}



const Category = () => {
  const { setProgress, steps, category, setCategory, name, desc, selectedFeatures, selectedImages } = useContext(ListingDetailsContext);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();


  useEffect(() => {
    const array = [name, desc, selectedFeatures.length, selectedImages.length];
    const check = array.some((item) => !item);
    if (check) return navigate("/boats-list/title");
    setProgress((100 / steps) * 6);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["getListingDetailsCategories"],
    queryFn: fetchCategories,
  })

  if (isLoading) return <LoadingLine />;

  const handleContinue = () => {
    if (!category) return toast.error(t("please_select_a_choice"), {
      style: { border: "1px solid #FF385C", color: "#FF385C" },
    });
    navigate("/boats-list/regionsD");
  };


  return (
    <div className="w-full md:w-[500px]">
      <PageName text="choose_your_boat_category" />
      <div className="categories flex flex-wrap gap-2 lg:gap-3">
        {data.map((feature: any, index: number) => (
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