import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NextButton from "./NextButton";
import { useTranslation } from "react-i18next";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import PickADay from "./PickADay";
import { InquiryContext } from "../../Layout/InquiryLayout";
import axios from "axios";
import LoadingLine from "../ui/LoadingLine";
import Swal from "sweetalert2";


const DateComp = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [date, setDate] = useState<any>(sessionStorage.getItem("inquiry_date") || "");
  const { setProgress } = useContext(InquiryContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [takenDates, setTakenDates] = useState<any>([]);
  const urlListings = import.meta.env.VITE_SERVER_URL_LISTING;


  useEffect(() => {
    setProgress((100 / 6) * 2);
    const getBoat = async () => {
      axios
        .get(`${urlListings}/api/listing/listings/${boatId}`)
        .then((res) => {
          setTakenDates(res.data.Availabilities);
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
            });
          }
        });
    };
    getBoat();
  }, []);

  const nextHandler = () => {
    if (!date) return;
    sessionStorage.setItem("inquiry_date", date);
    navigate(`/inquiry/${boatId}/departure`);
  };


  return (
    <div
      className={`all flex flex-col items-center ${
        isCalendarOpen ? "h-[390px]" : "h-full"
      }`}
    >
      <p className="text-[22px] font-medium text-writingMainDark">
        {t("preferred_date")}
      </p>
      <p className="text-[14px] text-writingGrey text-center">
        {t("provide_the_preferred_date")}
      </p>

      {/* the fields */}
      <div className="preferedDay w-[220px] h-[35px] flex justify-between items-center mt-10 gap-3">
        <p className="text-writingGrey">{t("date")}</p>
        {loading ? <LoadingLine /> :
          <div
            className="day bg-emptyInput h-8 flex-grow flex items-center border-1 border-gray-400 rounded-[5px] justify-between px-3 cursor-pointer"
            onClick={() => { setIsCalendarOpen(true) }}
          >
            <FaRegCalendarAlt className="text-writingGrey" />
            <p>{date}</p>
            <button onClick={(e: any) => {
              e.stopPropagation();
              setDate("");
            }}>x</button>
          </div>
        }
      </div>

      <NextButton onClick={nextHandler} />

      {isCalendarOpen && (
        <PickADay
          setIsCalendarOpen={setIsCalendarOpen}
          setDate={setDate}
          reserved={takenDates}
        />
      )}
    </div>
  );
};

export default DateComp;
