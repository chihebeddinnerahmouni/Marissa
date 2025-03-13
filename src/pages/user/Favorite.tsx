import ShipsCont from "@/containers/rental/shipsCont";
import { useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSuspenseQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";

const fetsData = async () => {
  const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;
  const res = await axios.get(`${urlListing}/api/favourites`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return res.data;
};

const Favorite = () => {
  const { t } = useTranslation();

  const { data, error } = useSuspenseQuery({
    queryKey: ["favourites"],
    queryFn: fetsData,
  });

  useEffect(() => {
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return <div className="w-full h-screen" />;


  return (
    <div
      className={`content mainHeightCss w-full mt-[90px] px-[20px] pb-10 flex flex-col md:px-[80px] md:mt-[100px] lg:px-[120px] lg:mt-[105px] 2xl:px-[220px]`}
    >
      <p className="font-semibold text-[26px] lg:text-[25px]">
        {t("favorite")}
      </p>
      <div className="ships mt-[-50px]">
        <ShipsCont shipsArray={data.listings} />
      </div>
    </div>
  );
};
export default Favorite;
