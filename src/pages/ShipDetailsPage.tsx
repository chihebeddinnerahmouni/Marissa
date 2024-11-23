// import oneShipJson from "../assets/files/OneShipJson.json"
import { useParams } from "react-router-dom";
import ShipImagesDescription from "../containers/ship details/ShipImagesDescription";
import {useState, useEffect } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CompareComp from "@/components/ship detail page/CompareComp";
import DateCheck from "@/components/ship detail page/DateCheck";
import ReviewByStars from "@/components/ship detail page/ReviewByStars";
import Reviews from "@/components/ship detail page/Reviews";
import Offers from "@/components/ship detail page/Offers";
import Location from "@/components/ship detail page/Location";
import { useMediaQuery } from "react-responsive";
import Desc from "@/components/ship detail page/Desc";


const ShipDetailsPage = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const [shipDetails, setShipDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL_LISTING}/api/listing/listings/${boatId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        setShipDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 404) {
          Navigate("/404");
        }

        if (error.message === "Network Error") {
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

    // setShipDetails(oneShipJson);
    // setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }


  return (
    <div className="w-full mt-[90px] pb-10 px-4 flex flex-col items-center md:px-20 lg:mt-[130px] lg:px-[100px] 2xl:px-[220px]">
      <ShipImagesDescription ship={shipDetails} />
      <hr className="my-5 lg:my-18" />

      <div className="w-full grid grid-cols-1 md:max-w-[700px] lg:max-w-full lg:flex lg:gap-x-10 lg:items-start 2xl:max-w-[1700px]">
        <div className="check w-full lg:full">
          <Desc description={shipDetails.description} />
          <hr className="my-7 lg:my-10" />
          {isMobile && (
            <>
              <CompareComp ship={shipDetails} />
              <hr className="my-7 lg:my-10" />
            </>
          )}
          <DateCheck ship={shipDetails} />
          <hr className="my-7 lg:my-10" />
          <ReviewByStars ship={shipDetails} />
          <hr className="my-7 lg:my-10" />
          <Reviews ship={shipDetails} />
          <hr className="my-7 lg:my-10" />
          <Offers ship={shipDetails} />
          <hr className="my-7 lg:my-10" />
          <Location ship={shipDetails} />
        </div>
        {!isMobile && <CompareComp ship={shipDetails} />}
      </div>
    </div>
  );
};

export default ShipDetailsPage;































  // <div className="w-full mt-[90px] pb-10 px-4 flex flex-col items-center md:px-20 lg:mt-[130px] lg:px-[100px] 2xl:px-[220px]">
    //   <ShipImagesDescription ship={shipDetails} />
    //   <hr className="my-5 lg:my-18" />
    //   {/* <ShipCheck ship={shipDetails} /> */}
    //   <div className="w-full grid grid-cols-1 md:max-w-[700px] lg:max-w-full lg:grid-cols-2 lg:gap-x-14 lg:items-start 2xl:max-w-[1700px]">
    //     <div className="desc h-full flex items-center">
    //       <p className="lg:text-[23px]">{shipDetails.description}</p>
    //     </div>
    //     <CompareComp ship={shipDetails} />
    //     <div className="check w-full">
    //       <DateCheck ship={shipDetails} />
    //       <hr className="my-7 lg:my-10" />
    //       <ReviewByStars ship={shipDetails} />
    //       <hr className="my-7 lg:my-10" />
    //       <Reviews ship={shipDetails} />
    //       <hr className="my-7 lg:my-10" />
    //       <Offers ship={shipDetails} />
    //       <hr className="my-7 lg:my-10" />
    //       <Location />
    //     </div>
    //   </div>
    // </div>