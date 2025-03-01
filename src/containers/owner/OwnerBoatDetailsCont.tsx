import { useTranslation } from "react-i18next";
import OptionsButton from "@/components/owner/OptionsButton";
import NamePic from "../../components/owner/NamePic";
import Desc from "@/components/owner/Desc";
import Validated from "@/components/owner/Validated";
import Prices from "@/components/owner/Prices";
import Region from "@/components/owner/Region";
import Guests from "@/components/owner/Guests";
import Availability from "@/components/owner/Availability";
import SpeceficDates from '../../components/owner/SpeceficDates'
import axios from "axios";
import LoadingLine from "@/components/ui/LoadingLine";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import Images from "@/components/owner/Images";
import Blocked from "@/components/owner/Blocked";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";




const OwnerBoatDetailsCont = () => {
  const { i18n, t } = useTranslation();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { myBoatId } = useParams<{ myBoatId: string }>();
  // const [changed, setChanged] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootState) => state.user.user
  );


  useEffect(() => { 
    if (Object.keys(user).length !== 0) {
        if (!user.isBoatOwner) {
          navigate("/login");
        }
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      axios
        .get(`${url}/api/listing/listings/${myBoatId}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.user_id !== user.id) {
          Swal.fire("error", "you_dont_have_access_to_this_boat", "error").then(
            () => {
              navigate("/my-boats");
            }
          );
        }
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.status === 404) {
          Swal.fire("error", "theres_no_boat_match_this_id", "error").then(
            () => {
              navigate("/");
            }
          );
        } else if (err.message === "Network Error") {
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
      })
    }
    if (user.id) fetchData()
  }, [myBoatId, user.id]);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }

  // console.log(details);

  return (
    <>
      <div className="content w-full pb-20 px-4 md:px-10 md:mx-auto md:w-[550px] xl:w-[650px] lg:pb-28">
        <div className="top flex items-center gap-2">
          <button
            className="flex items-center gap-2 lg:hidden"
            onClick={() => navigate("/my-boats")}
          >
            {i18n.language === "ar" ? (
              <FaArrowRightLong
                className={`text-[16px] lg:text-[25px] mt-2 text-writingMainDark`}
              />
            ) : (
              <FaArrowLeftLong
                className={`text-[16px] lg:text-[25px] mt-2 text-writingMainDark`}
              />
            )}
          </button>
          <p className="text-[18px] lg:text-[20px] font-medium text-writingGrey mt-2 w-full self-start ellipsesCss">
            {details.title}
          </p>
        </div>

        <Validated validated={details.validated} />

        {details.validated && <Blocked blocked={details.blocked} /> }
        <NamePic
          title={details.title}
          // changed={changed}
          // setChanged={setChanged}
          image={details.Images[0].url}
        />
        <Desc description={details.description} />
        <Images images={details.Images} />
        <Prices prices={details.Prices} />
        <SpeceficDates prices={details.Prices} />
        <Region region={details.region} />
        <Guests guests={details.guests} />
        <Availability
          availabilities={details.Availabilities}
        />
      </div>

      <OptionsButton />
    </>
  );
};

export default OwnerBoatDetailsCont;



// const one = {
//   id: 93,
//   title: "chiheb's boat",
//   description: "boat",
//   rating: 0,
//   latitude: 36.1907,
//   longitude: 5.44188,
//   validated: true,
//   blocked: false,
//   block_reason: "This is a test reason",
//   user_id: 15,
//   owner: {
//     id: 15,
//     name: "chiheb",
//     surname: "rahmouni",
//     email: "chihebrahmouni31@gmail.com",
//     image: "uploads\\avatars\\1731328879163.png",
//     createdAt: "11/11/2024",
//   },
//   createdAt: "2024-11-11T12:40:26.000Z",
//   updatedAt: "2024-11-11T12:40:58.000Z",
//   Images: [
//     {
//       id: 445,
//       listing_id: 93,
//       url: "uploads\\1731328825690-hirbae.jpg",
//       createdAt: "2024-11-11T12:40:26.000Z",
//       updatedAt: "2024-11-11T12:40:26.000Z",
//     },
//     {
//       id: 446,
//       listing_id: 93,
//       url: "uploads\\1731328825707-marissa landing.png",
//       createdAt: "2024-11-11T12:40:26.000Z",
//       updatedAt: "2024-11-11T12:40:26.000Z",
//     },
//     {
//       id: 447,
//       listing_id: 93,
//       url: "uploads\\1731328826009-Capture dâÃ©cran 2024-10-12 111929.png",
//       createdAt: "2024-11-11T12:40:26.000Z",
//       updatedAt: "2024-11-11T12:40:26.000Z",
//     },
//     {
//       id: 448,
//       listing_id: 93,
//       url: "uploads\\1731328826012-Capture dâÃ©cran 2024-10-11 121844.png",
//       createdAt: "2024-11-11T12:40:26.000Z",
//       updatedAt: "2024-11-11T12:40:26.000Z",
//     },
//     {
//       id: 449,
//       listing_id: 93,
//       url: "uploads\\1731328826341-Capture dâÃ©cran 2024-10-11 003124.png",
//       createdAt: "2024-11-11T12:40:26.000Z",
//       updatedAt: "2024-11-11T12:40:26.000Z",
//     },
//   ],
//   region: "Al Riadh",
//   Features: [
//     {
//       id: 6,
//       name: "test test test",
//       image: "uploads\\features\\1730308437171-hirbae.jpg",
//       createdAt: "2024-10-30T17:13:57.000Z",
//       updatedAt: "2024-10-30T17:13:57.000Z",
//       ListingFeatures: {
//         createdAt: "2024-11-11T12:40:26.000Z",
//         updatedAt: "2024-11-11T12:40:26.000Z",
//         feature_id: 6,
//         listing_id: 93,
//       },
//     },
//     {
//       id: 3,
//       name: "Bath",
//       image: "uploads\\features\\1730308411205-hirbae.jpg",
//       createdAt: "2024-10-30T17:13:31.000Z",
//       updatedAt: "2024-10-30T17:13:31.000Z",
//       ListingFeatures: {
//         createdAt: "2024-11-11T12:40:26.000Z",
//         updatedAt: "2024-11-11T12:40:26.000Z",
//         feature_id: 3,
//         listing_id: 93,
//       },
//     },
//   ],
//   Benefits: [],
//   Availabilities: [
//     {
//       id: 130,
//       listing_id: 93,
//       start_date: "2024-11-16",
//       end_date: "2024-11-16",
//       reserved: true,
//       createdAt: "2024-11-14T17:32:26.000Z",
//       updatedAt: "2024-11-14T17:32:26.000Z",
//     },
//   ],
//   Prices: [
//     {
//       id: 89,
//       listing_id: 93,
//       price_per_hour: 1200,
//       date_specific_price: [],
//       min_hours: 1,
//       max_hours: 2,
//       createdAt: "2024-11-11T12:40:26.000Z",
//       updatedAt: "2024-11-11T12:40:26.000Z",
//     },
//   ],
//   priceRange: {
//     min: null,
//     max: null,
//   },
//   reviews: [
//     {
//       user: {
//         id: 14,
//         name: "zakaria",
//         email: "a@a.com",
//         image: "uploads\\avatars\\1731330486612.png",
//         createdAt: "11/11/2024",
//       },
//       review_content: "vbnghn bnfg gjhg jghj ghjdghjd hjghjhj",
//     },
//     {
//       user: {
//         id: 14,
//         name: "zakaria",
//         email: "a@a.com",
//         image: "uploads\\avatars\\1731330486612.png",
//         createdAt: "11/11/2024",
//       },
//       review_content: "",
//     },
//     {
//       user: {
//         id: 14,
//         name: "zakaria",
//         email: "a@a.com",
//         image: "uploads\\avatars\\1731330486612.png",
//         createdAt: "11/11/2024",
//       },
//       review_content: "",
//     },
//     {
//       user: {
//         id: 14,
//         name: "zakaria",
//         email: "a@a.com",
//         image: "uploads\\avatars\\1731330486612.png",
//         createdAt: "11/11/2024",
//       },
//       review_content: "",
//     },
//     {
//       user: {
//         id: 14,
//         name: "zakaria",
//         email: "a@a.com",
//         image: "uploads\\avatars\\1731330486612.png",
//         createdAt: "11/11/2024",
//       },
//       review_content: "",
//     },
//   ],
//   averageRatings: {
//     route_experience: 0.4,
//     value: 0.48,
//     communication: 1,
//     vessel_equipment: 0.2,
//     departure_return: 0.4,
//     listing_accuracy: 0.4,
//   },
// };