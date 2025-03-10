import { useTranslation } from "react-i18next";
import OptionsButton from "@/components/owner/OptionsButton";
import NamePic from "../../components/owner/NamePic";
import Desc from "@/components/owner/Desc";
import Validated from "@/components/owner/Validated";
import Prices from "@/components/owner/Prices";
import Region from "@/components/owner/Region";
import Guests from "@/components/owner/Guests";
import Availability from "@/components/owner/Availability";
import SpeceficDates from "../../components/owner/SpeceficDates";
import axios from "axios";
import LoadingLine from "@/components/ui/LoadingLine";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import Images from "@/components/owner/Images";
import Blocked from "@/components/owner/Blocked";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { axios_boatid_error } from "@/functions/axios_boatid_error";

const fetshData = async (myBoatId: string) => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const res = await axios.get(`${url}/api/listing/listings/${myBoatId}`);
  return res.data;
};

const OwnerBoatDetailsCont = () => {
  const { t } = useTranslation();
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      if (!user.isBoatOwner) {
        navigate("/login");
      }
    }
  }, [user]);

  const {
    data: details,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myBoatDetails", myBoatId],
    queryFn: () => fetshData(myBoatId!),
    enabled: !!myBoatId,
  });

  useEffect(() => {
    if (error) axios_boatid_error(error, t);
  }, [error]);
  if (error) return <div className="w-full h-screen"></div>;

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <div className="flex-grow inboxListCss overflow-auto">
      <div className="content relative bg-green200 w-full pb-20 px-4 md:px-10 md:mx-auto md:w-[550px] xl:w-[650px]">
        <Top title={details.title} />
        <Validated validated={details.validated} />
        {details.validated && <Blocked blocked={details.blocked} />}
        <NamePic title={details.title} image={details.Images[0].url} />
        <Desc description={details.description} />
        <Images images={details.Images} />
        <Prices prices={details.Prices} />
        <SpeceficDates prices={details.Prices} />
        <Region region={details.region} />
        <Guests guests={details.guests} />
        <Availability availabilities={details.Availabilities} />
      </div>

      <OptionsButton />
    </div>
  );
};

export default OwnerBoatDetailsCont;

const Top = ({ title }: { title: string }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const Icon = i18n.language === "ar" ? FaArrowRightLong : FaArrowLeftLong;

  return (
    <div className="top py-5 bg-red200 flex items-center gap-4">
      <button
        className="flex items-center gap-2 lg:hidden"
        onClick={() => navigate("/my-boats")}
      >
        <Icon className={`lg:text-[25px] text-writingMainDark`} />
      </button>
      <p className="text-[18px] font-medium text-writingGrey w-full selfstart ellipsesCss lg:text-[20px]">
        {title}
      </p>
    </div>
  );
};
