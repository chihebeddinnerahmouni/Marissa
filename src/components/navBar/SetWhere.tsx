import { useTranslation } from "react-i18next";
import PlacesButtons from "./PlacesComp";
import axios from "axios";
import {
  useCallback,
} from "react";
import LoadingLine from "../ui/LoadingLine";
// import { NavBarContext } from "../ui/NavBar";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query"




const SetWhere = () => {
  const { i18n, t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  const fetshRegions = useCallback(async () => {
    const { data } = await axios.get(`${url}/api/region/regions`);
    return data;
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRegions"],
    queryFn: fetshRegions,
  });

  if (error) {
    Swal.fire({
      icon: "error",
      title: t("error"),
      text: t("please_try_again"),
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    }).then(() => {
      window.location.reload();
    });
    return null;
  }

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
