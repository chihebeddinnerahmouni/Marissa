import isLoggedIn from "@/lib/isLogedin";
import { useEffect, useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import { TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ReviewMake = () => {
    const { t } = useTranslation();
    const [comment, setComment] = useState("");
    const [communicationRate, setCommunicationRate] = useState(0);
    const [departureRate, setDepartureRate] = useState(0);
    const [listingRate, setListingRate] = useState(0);
    const [routeRate, setRouteRate] = useState(0);
  const [vesselEquipmentRate, setVesselEquipmentRate] = useState(0);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  const mainColor = "#FF385C"
  const { inboxId } = useParams();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const isBoatOwner = localStorage.getItem("isBoatOwner") === "true";

    useEffect(() => {
        if (!isLoggedIn() || isBoatOwner) {
            return navigate("/?page=1");
      }
    }, []);
  
  // console.log(inboxId);

  const rateFunction = () => {
    axios
      .post(`${url}/api/review/reviews/${inboxId}`, {
        
  review_content: comment,
  route_experience: routeRate,
  communication: communicationRate,
  vessel_equipment: vesselEquipmentRate,
  departure_return: departureRate,
  listing_accuracy: listingRate

      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        setLoading(true);
        Swal.fire({
          icon: "success",
          title: t("review_submitted"),
          showConfirmButton: false,
        }).then(() => {
          navigate("/?page=1");
        });
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
  }

    return (
      <div className="w-full mt-[75px] py-10 px-4 flex flex-col items-center justify-between md:px-20 lg:mt-[95px] lg:px-[100px] 2xl:px-[220px] reviewHeightCss">
        {/* Success message */}
        <div className="top w-full flex flex-col items-center ">
          <div className="text-writingMainDark relative mb-6 w-full max-w-2xl text-center flex flex-col">
            <strong className="font-bold text-[28px]">
              {t("drop_anchor")}
            </strong>
            <span className="block sm:inline">
              {t("your_sailing_adventure_has_ended")}
            </span>
          </div>

          {/* Comment input */}
          <Box className="w-full max-w-2xl mb-6">
            <Typography variant="h6" gutterBottom>
              {t("leave_comment")}
            </Typography>
            <TextField
              label={t("comment")}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={comment}
              sx={{
                marginTop: "2px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "grey",
                  },
                  "&:hover fieldset": {
                    borderColor: "grey",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: mainColor,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: mainColor,
                },
              }}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>

          {/* Star ratings */}
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between flex-wrap w-full mb-4">
              <Typography className="text-sm font-medium text-writingGrey lg:text-base">
                {t("communication")}
              </Typography>
              <StarRatings
                rating={communicationRate}
                starHoverColor="#FFD700"
                starEmptyColor="#dddcdc"
                starRatedColor="#FFD700"
                changeRating={(newRating) => setCommunicationRate(newRating)}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </div>
            <div className="flex items-center justify-between flex-wrap w-full mb-4">
              <Typography className="text-sm font-medium text-writingGrey lg:text-base">
                {t("departure_return")}
              </Typography>
              <StarRatings
                rating={departureRate}
                starHoverColor="#FFD700"
                starEmptyColor="#dddcdc"
                starRatedColor="#FFD700"
                changeRating={(newRating) => setDepartureRate(newRating)}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </div>
            <div className="flex items-center justify-between flex-wrap w-full mb-4">
              <Typography className="text-sm font-medium text-writingGrey lg:text-base">
                {t("listing_accuracy")}
              </Typography>
              <StarRatings
                rating={listingRate}
                starHoverColor="#FFD700"
                starEmptyColor="#dddcdc"
                starRatedColor="#FFD700"
                changeRating={(newRating) => setListingRate(newRating)}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </div>
            <div className="flex items-center justify-between flex-wrap w-full mb-4">
              <Typography className="text-sm font-medium text-writingGrey lg:text-base">
                {t("route_experience")}
              </Typography>
              <StarRatings
                rating={routeRate}
                starHoverColor="#FFD700"
                starEmptyColor="#dddcdc"
                starRatedColor="#FFD700"
                changeRating={(newRating) => setRouteRate(newRating)}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </div>
            <div className="flex items-center justify-between flex-wrap w-full mb-4">
              <Typography className="text-sm font-medium text-writingGrey lg:text-base">
                {t("vessel_equipment")}
              </Typography>
              <StarRatings
                rating={vesselEquipmentRate}
                starHoverColor="#FFD700"
                starEmptyColor="#dddcdc"
                starRatedColor="#FFD700"
                changeRating={(newRating) => setVesselEquipmentRate(newRating)}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="1px"
              />
            </div>
          </div>
        </div>

        <button
          className="w-full min-h-[40px] bg-main rounded-10 text-white mt-10 max-w-2xl"
          onClick={rateFunction}
        >
          {loading ? <LoadingButton /> : t("submit_review")}
        </button>
      </div>
    );
};

export default ReviewMake;