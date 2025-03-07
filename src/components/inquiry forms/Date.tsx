import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NextButton from "./NextButton";
import { useTranslation } from "react-i18next";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState, useContext, useEffect, useCallback } from "react";
import PickADay from "./PickADay";
import { InquiryContext } from "../../Layout/InquiryLayout";
import axios from "axios";
import LoadingLine from "../ui/LoadingLine";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const fetshData = async (boatId: string) => {
  const urlListings = import.meta.env.VITE_SERVER_URL_LISTING;
  const { data } = await axios.get(
    `${urlListings}/api/listing/listings/${boatId}`
  );
  return data;
};

const DateComp = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [date, setDate] = useState<any>(
    sessionStorage.getItem("inquiry_date") || ""
  );
  const { setProgress } = useContext(InquiryContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["boat", boatId],
    queryFn: () => fetshData(boatId!),
    enabled: !!boatId,
  });

  useEffect(() => {
    setProgress((100 / 6) * 2);
  }, []);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: t("network_error"),
        text: t(error.message),
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
    }
  }, [error]);

 const nextHandler = useCallback(() => {
   if (!date) return;
   sessionStorage.setItem("inquiry_date", date);
   navigate(`/inquiry/${boatId}/departure`);
 }, [date]);
 

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
        {isLoading ? (
          <LoadingLine />
        ) : (
          <div
            className="day bg-emptyInput h-8 flex-grow flex items-center border-1 border-gray-400 rounded-[5px] justify-between px-3 cursor-pointer"
            onClick={() => {
              setIsCalendarOpen(true);
            }}
          >
            <FaRegCalendarAlt className="text-writingGrey" />
            <p>{date}</p>
            <button
              onClick={(e: any) => {
                e.stopPropagation();
                setDate("");
              }}
            >
              x
            </button>
          </div>
        )}
      </div>

      <NextButton onClick={nextHandler} />

      {isCalendarOpen && (
        <PickADay
          setIsCalendarOpen={setIsCalendarOpen}
          setDate={setDate}
          reserved={data?.Availabilities}
        />
      )}
    </div>
  );
};

export default DateComp;
