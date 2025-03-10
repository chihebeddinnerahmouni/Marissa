import CategoryComp from "@/components/help/CategoryComp";
import {
  // useContext,
  useEffect
} from "react";
// import { HelpContext } from "@/Layout/HelpLayout";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "@/functions/axios_error_handler";
import { useTranslation } from "react-i18next";
import LoadingLine from "@/components/ui/LoadingLine";


const image = "/listing-done.jpg";
const fetshCategories = async () => {
  const url = import.meta.env.VITE_SERVER_URL_HELP as string;
  const res = await axios.get(`${url}/categories`);
  return res.data;
};

const Help = () => {
  const { t } = useTranslation();

const {
  data: categories,
  isLoading,
  error,
  // isSuccess,
} = useQuery({
  queryKey: ["getHelpCategories"],
  queryFn: fetshCategories,
});
  
  useEffect(() => {
    error && axios_error_handler(error, t);
  }, [error]);
  if (error) return <div className="w-full h-screen"></div>;
  
  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }
  

  return (
    <div className="w-full">
      <LazyLoadImage
        alt="sea"
        effect="blur"
        src={image}
        width={"100%"}
        className="h-[300px] object-cover object-center"
      />

      <div className="grid gap-4 p-4 items-center max-w-[1200px] mx-auto md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: any, index: number) => (
          <CategoryComp key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Help;
