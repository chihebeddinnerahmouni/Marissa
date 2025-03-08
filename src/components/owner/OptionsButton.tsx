import { useTranslation } from "react-i18next";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OptionsButton = () => {
  const { t, i18n } = useTranslation();
  const [isOptionsOn, setIsOptionsOn] = useState(false);

  const Icon = isOptionsOn ? FaChevronUp  : FaChevronDown;

  return (
    <div
      className={`w-full absolute px-4 h-[60px] bg-creme bottom-[-2px] py-2 lg:h-[70px] flex justify-center items-center lg:w-auto ${
        i18n.language === "ar"
          ? "lg:left-0 lg:right-[350px]"
          : "lg:right-0 lg:left-[350px]"
      }`}
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <button
        className="relative w-full h-full rounded-20 bg-main text-white font-medium md:w-[530px] xl:w-[630px]"
        onClick={() => setIsOptionsOn(!isOptionsOn)}
      >
        {t("options")} <Icon className="inline-block ml-2" />
        {isOptionsOn && <Options />}
      </button>
    </div>
  );
};
export default OptionsButton;

const Options = () => {
  const { i18n, t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const navigate = useNavigate();
  // const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });

  const deleteBoat = () => {
    Swal.fire({
      title: t("are_you_sure"),
      text: t("you_want_to_delete_this_boat"),
      showCancelButton: true,
      confirmButtonColor: "#28a745", 
      cancelButtonColor: "#dc3545",
      confirmButtonText: t("yes"),
      cancelButtonText: t("no"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/api/listing/owner/my-listings/delete/${myBoatId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: t("greate"),
            });
            navigate("/my-boats"), window.location.reload();
          });
        // console.log("here");
      }
    });
  };

  return (
    <div
      className={`options absolute p-3 rounded-10 bg-white shadow-hardShadow text-writingMainDark bottom-[50px] flex flex-col gap-3 items-start lg:bottom-[60px] ${
        i18n.language === "en" ? "left-0" : "right-0"
      }`}
    >
      <div
        className="flex items-center h-full px-4 cursor-pointer gap-3"
        onClick={deleteBoat}
      >
        <MdDeleteSweep className="text-2xl" />
        <p className="">{t("delete_boat")}</p>
      </div>
      {/* <hr className="w-full border-1 border-gray-200" /> */}
    </div>
  );
};
