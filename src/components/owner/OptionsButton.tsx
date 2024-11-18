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

  return (
    <div className={`w-full fixed px-4 h-[60px] bg-creme shadow-hoverShadow bottom-0 py-2 lg:h-[70px] flex justify-center items-center lg:w-auto ${i18n.language === "ar" ? "lg:left-0 lg:right-[350px]":"lg:right-0 lg:left-[350px]"}`}>
      <button
        className="relative w-full h-full rounded-20 bg-main text-white font-medium md:w-[530px] xl:w-[630px]"
        onClick={() => setIsOptionsOn(!isOptionsOn)}
      >
        {t("options")}{" "}
        {isOptionsOn ? (
          <FaChevronDown className="inline-block ml-2" />
        ) : (
          <FaChevronUp className="inline-block ml-2" />
        )}
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
      title: "are_you_sure",
      text: "you_wont_be_able_to_revert_this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(() => {
      axios
        .delete(`${url}/api/listing/owner/my-listings/delete/${myBoatId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(() => {
          Swal.fire("deleted!", "your_boat_has_been_deleted.", "success").then(
            () => {
              navigate("/my-boats"),
                window.location.reload();   
            }
          )
        });
    });
  };


  return (
    <div
      className={`options absolute p-3 rounded-10 bg-white shadow-hardShadow text-writingMainDark bottom-[50px] flex flex-col gap-3 items-start lg:bottom-[60px] ${
        i18n.language === "en" ? "left-0" : "right-0"
      }`}
    >
      <div className="flex items-center h-full px-4 cursor-pointer gap-3" onClick={deleteBoat}>
        <MdDeleteSweep className="text-2xl" />
        <p className="">{t("delete_boat")}</p>
      </div>
      {/* <hr className="w-full border-1 border-gray-200" /> */}
    </div>
  );
};

