import { useTranslation } from "react-i18next";
import PlacesButtons from "./PlacesComp";
import axios from "axios";
import {
  useCallback,
  useEffect
} from "react";
import LoadingLine from "../ui/LoadingLine";
import { useQuery } from "@tanstack/react-query"
import {axios_error_handler} from "@/functions/axios_error_handler";



const SetWhere = () => {
  const { i18n, t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  const fetshRegions = useCallback(async () => {
    const { data } = await axios.get(`${url}/api/region/regions`);
    return data;
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRegionsNavbar"],
    queryFn: fetshRegions,
  });

  useEffect(() => {
    if (error) axios_error_handler(error, t);
  }, [error]);

  if (isLoading)  return (
      <div className="w-full h-10">
        <LoadingLine />
      </div>
    );


  return (
    <div
      className={`max-h-[420px] w-[100%]flex flex-col gap-1 lg:max-h-[420px] ${
        i18n.language === "en" ? "lg:mr-auto" : "lg:ml-auto"
      }`}
    >
      {data.map((place: any, index: any) => (
        <PlacesButtons key={index} place={place} />
      ))}
    </div>
  );
};

export default SetWhere;
