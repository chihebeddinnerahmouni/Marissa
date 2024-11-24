import { useTranslation } from "react-i18next";
import PlacesButtons from "./PlacesComp";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import LoadingLine from "../ui/LoadingLine";
import { NavBarContext } from "../ui/NavBar";
import Swal from "sweetalert2";

const SetWhere = () => {
  const { i18n, t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const [loading, setLoading] = useState(true);
  const { setWhereArray, whereArray } = useContext(NavBarContext);


  useEffect(() => {
    if (whereArray.length > 0) {
      setLoading(false);
      return;
    } else {
      axios
        .get(`${url}/api/region/regions`)
        .then((response) => {
          setWhereArray(response.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            Swal.fire({
              icon: "error",
              title: t("network_error"),
              text: t("please_try_again"),
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            }).then(() => {
              window.location.reload();
            });
          }
        });
    }
  }, []);

  if (loading)
    return (
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
      {whereArray.map((place: any, index: any) => (
        <PlacesButtons key={index} place={place} />
      ))}
    </div>
  );
};

export default SetWhere;
