import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import { axios_error_handler } from "@/functions/axios_error_handler";
import MultiLines from "@/components/ui/inputs/MultiLine";
import ButtonFunc from "@/components/ui/buttons/Button";


const url = import.meta.env.VITE_SERVER_URL_LISTING;
const sendReview = async (body: any, inboxId: string) => {
  const { data } = await axios.post(
    `${url}/api/review/reviews/${inboxId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  return data;
};

const ReviewMake = () => {
  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  const [communicationRate, setCommunicationRate] = useState(0);
  const [departureRate, setDepartureRate] = useState(0);
  const [listingRate, setListingRate] = useState(0);
  const [routeRate, setRouteRate] = useState(0);
  const [vesselEquipmentRate, setVesselEquipmentRate] = useState(0);
  const navigate = useNavigate();
  const { inboxId } = useParams();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (Object.keys(user).length !== 0 && !user.isBoatOwner) {
      return navigate("/?page=1");
    }
  }, [user]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ body, inboxId }: { body: any; inboxId: string }) => sendReview(body, inboxId!),
    onError: (err) => {
      axios_error_handler(err, t);
    },
    onSuccess: () => {
      navigate("/?page=1");
    },
  });

  const rateFunction = () => {
    mutate({
      body: {
        review_content: comment,
        route_experience: routeRate,
        communication: communicationRate,
        vessel_equipment: vesselEquipmentRate,
        departure_return: departureRate,
        listing_accuracy: listingRate,
      },
      inboxId: inboxId!,
    });
  };



  return (
    <div className="w-full mt-[75px] py-10 px-4 flex flex-col items-center justify-between md:px-20 lg:mt-[95px] lg:px-[100px] 2xl:px-[220px] reviewHeightCss">
      <div className="top w-full flex flex-col items-center ">
        <Top t={t} />

        {/* Comment input */}
        <Box className="w-full max-w-2xl mb-6">
          <h1 className="mb-2">{t("leave_comment")}</h1>
          <MultiLines
            label={t("comment")}
            value={comment}
            setValue={(e: any) => setComment(e.target.value)}
          />
        </Box>

        {/* Star ratings */}
        <div className="w-full max-w-2xl">
          <RatieComponent title={t("communication")} rate={communicationRate} setRate={setCommunicationRate} />
          <RatieComponent title={t("departure_return")} rate={departureRate} setRate={setDepartureRate} />
          <RatieComponent title={t("listing_accuracy")} rate={listingRate} setRate={setListingRate} />
          <RatieComponent title={t("route_experience")} rate={routeRate} setRate={setRouteRate} />
          <RatieComponent title={t("vessel_equipment")} rate={vesselEquipmentRate} setRate={setVesselEquipmentRate} />
        </div>
      </div>
      <ButtonFunc
        text={t("submit_review")}
        onClick={rateFunction}
        loading={isPending}
      />
    </div>
  );
};

export default ReviewMake;


const Top = ({t}:{t:any}) => { 
  return (
    <div className="text-writingMainDark relative mb-6 w-full max-w-2xl text-center flex flex-col">
      <strong className="font-bold text-[28px]">{t("drop_anchor")}</strong>
      <span className="block sm:inline">
        {t("your_sailing_adventure_has_ended")}
      </span>
    </div>
  );
}

const RatieComponent = ({ title, rate, setRate }: { title: string; rate: number; setRate: any }) => {

  return (
    <div className="flex items-center justify-between w-full mb-4 p-4 bg-gray-100 shadow-md rounded-md">
      <p className="text-base font-medium text-gray-800">{title}</p>
      <StarRatings
        rating={rate}
        starHoverColor="#FFD700"
        starEmptyColor="#ccc"
        starRatedColor="#FFD700"
        changeRating={(newRating) => setRate(newRating)}
        numberOfStars={5}
        name="rating"
        starDimension="20px"
        starSpacing="2px"
      />
    </div>
  );
}