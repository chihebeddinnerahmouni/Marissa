import { useParams } from "react-router-dom";
import ShipImagesDescription from "../containers/ship details/ShipImagesDescription";
import { useCallback, useEffect } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CompareComp from "@/components/ship detail page/CompareComp";
import DateCheck from "@/components/ship detail page/DateCheck";
import ReviewByStars from "@/components/ship detail page/ReviewByStars";
import Reviews from "@/components/ship detail page/Reviews";
import Offers from "@/components/ship detail page/Offers";
import Location from "@/components/ship detail page/Location";
import { useMediaQuery } from "react-responsive";
import Desc from "@/components/ship detail page/Desc";
import { IListing } from "@/types/ship";
import { useQuery } from "@tanstack/react-query"
import {axios_error_handler} from "@/functions/axios_error_handler";


const ShipDetailsPage = () => {

  const { boatId } = useParams<{ boatId: string }>();
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });

  const fetchShipDetails = useCallback(async () => {
    const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL_LISTING}/api/listing/listings/${boatId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return data;
  }
  , [boatId]);
  
  const { data, error, isLoading } = useQuery<IListing>({
    queryKey: ["data?", boatId],
    queryFn: fetchShipDetails,
  });
  
  useEffect(() => {
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return <div className="h-screen w-full"/>;

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  




  return (
    <div className="w-full mt-[90px] pb10 px-4 flex flex-col items-center pb-10 md:px-20 lg:mt-[130px] lg:px-[100px] 2xl:px-[220px]">
      <ShipImagesDescription ship={data} />
      <hr className="my-5 lg:my-18" />
      <div className="w-full grid grid-cols-1 md:max-w-[700px] lg:max-w-full lg:flex lg:gap-x-10 lg:items-start 2xl:max-w-[1700px]">
        <div className="check w-full lg:full">
          <Desc description={data?.description} />
          <Devider />
          {isMobile && (
            <>
              <CompareComp ship={data} />
              <Devider />
            </>
          )}
          <DateCheck ship={data} />
          <Devider />
          <ReviewByStars ship={data} />
          <Devider />
          <Reviews ship={data} />
          <Devider />
          <Offers ship={data} />
          <Devider />
          <Location ship={data} />
        </div>
        {!isMobile && <CompareComp ship={data} />}
      </div>
    </div>
  );
};

export default ShipDetailsPage;


const Devider = () => <hr className="my-7 lg:my-10" />;






























  // <div className="w-full mt-[90px] pb-10 px-4 flex flex-col items-center md:px-20 lg:mt-[130px] lg:px-[100px] 2xl:px-[220px]">
    //   <ShipImagesDescription ship={data?} />
    //   <hr className="my-5 lg:my-18" />
    //   {/* <ShipCheck ship={data?} /> */}
    //   <div className="w-full grid grid-cols-1 md:max-w-[700px] lg:max-w-full lg:grid-cols-2 lg:gap-x-14 lg:items-start 2xl:max-w-[1700px]">
    //     <div className="desc h-full flex items-center">
    //       <p className="lg:text-[23px]">{data?.description}</p>
    //     </div>
    //     <CompareComp ship={data?} />
    //     <div className="check w-full">
    //       <DateCheck ship={data?} />
    //       <hr className="my-7 lg:my-10" />
    //       <ReviewByStars ship={data?} />
    //       <hr className="my-7 lg:my-10" />
    //       <Reviews ship={data?} />
    //       <hr className="my-7 lg:my-10" />
    //       <Offers ship={data?} />
    //       <hr className="my-7 lg:my-10" />
    //       <Location />
    //     </div>
    //   </div>
    // </div>