
import ShipDetails from "../../components/ui/ShipDetails";
import { useEffect, useState } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import axios from "axios";
import Pagination from "@/components/ui/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const Ships = ({ selectedType, listingOption }: any) => {
  const [shipsArray, setShipsArray] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  const fetchData = (page: number) => {

    let finalUrl = ""

    if (selectedType === undefined) {
      finalUrl = `${url}/api/listing/listings?page=${page}&sortBy=${listingOption}`
    }
    else {
      finalUrl = `${url}/api/listing/listings?page=${page}&categoryId=${selectedType}&sortBy=${listingOption}`
    }
    axios
      .get(
        `${finalUrl}`
      )
      .then((response) => {
        // console.log(response.data);
        setShipsArray(response.data.listings);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
        // console.log("ani hna");
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
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
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
        }
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = query.get("page");
    if (page) {
      const pageNumber = Number(page);
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      } else {
        navigate(`?page=1`, { replace: true });
      }
    } else {
      navigate(`?page=${currentPage}`, { replace: true });
    }
  }, [location.search, totalPages, navigate]);

  useEffect(() => {
    setLoading(true);
    fetchData(currentPage);
  }, [selectedType, currentPage, listingOption]);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  if (loading)
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );

  return (
    <>
      <div className="w-full mt-[65px] flex justify-center items-center">
        <div className="w-full grid grid-cols-1 justify-items-center gap-y-16 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-16 lg:gap-x-4 2xl:grid-cols-4">
          {shipsArray.map((ship: any, index: number) => (
            <ShipDetails key={index} ship={ship} />
          ))}
        </div>
      </div>
      <div className="pagination w-full mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Ships;
// {
//     "listings": [
//         {
//             "id": 93,
//             "title": "chiheb's boat",
//             "description": "boat",
//             "rating": 0.48,
//             "latitude": 36.1907,
//             "longitude": 5.44188,
//             "validated": true,
//             "blocked": false,
//             "block_reason": "This is a test reason",
//             "user_id": 15,
//             "category_id": 2,
//             "guests": 1,
//             "region_id": 1,
//             "createdAt": "2024-11-11T12:40:26.000Z",
//             "updatedAt": "2024-11-11T12:40:58.000Z",
//             "Images": [
//                 {
//                     "id": 449,
//                     "listing_id": 93,
//                     "url": "uploads\\1731328826341-Capture dâÃ©cran 2024-10-11 003124.png",
//                     "createdAt": "2024-11-11T12:40:26.000Z",
//                     "updatedAt": "2024-11-11T12:40:26.000Z"
//                 },
//                 {
//                     "id": 448,
//                     "listing_id": 93,
//                     "url": "uploads\\1731328826012-Capture dâÃ©cran 2024-10-11 121844.png",
//                     "createdAt": "2024-11-11T12:40:26.000Z",
//                     "updatedAt": "2024-11-11T12:40:26.000Z"
//                 },
//                 {
//                     "id": 447,
//                     "listing_id": 93,
//                     "url": "uploads\\1731328826009-Capture dâÃ©cran 2024-10-12 111929.png",
//                     "createdAt": "2024-11-11T12:40:26.000Z",
//                     "updatedAt": "2024-11-11T12:40:26.000Z"
//                 },
//                 {
//                     "id": 446,
//                     "listing_id": 93,
//                     "url": "uploads\\1731328825707-marissa landing.png",
//                     "createdAt": "2024-11-11T12:40:26.000Z",
//                     "updatedAt": "2024-11-11T12:40:26.000Z"
//                 },
//                 {
//                     "id": 445,
//                     "listing_id": 93,
//                     "url": "uploads\\1731328825690-hirbae.jpg",
//                     "createdAt": "2024-11-11T12:40:26.000Z",
//                     "updatedAt": "2024-11-11T12:40:26.000Z"
//                 }
//             ],
//             "Benefits": [],
//             "Availabilities": [
//                 {
//                     "id": 132,
//                     "listing_id": 93,
//                     "start_date": "2024-11-27",
//                     "end_date": "2025-08-03",
//                     "reserved": true,
//                     "createdAt": "2024-11-14T18:28:56.000Z",
//                     "updatedAt": "2024-11-14T18:28:56.000Z"
//                 },
//                 {
//                     "id": 131,
//                     "listing_id": 93,
//                     "start_date": "2024-11-16",
//                     "end_date": "2024-11-26",
//                     "reserved": true,
//                     "createdAt": "2024-11-14T17:48:07.000Z",
//                     "updatedAt": "2024-11-14T17:48:07.000Z"
//                 },
//                 {
//                     "id": 130,
//                     "listing_id": 93,
//                     "start_date": "2024-11-15",
//                     "end_date": "2024-11-15",
//                     "reserved": true,
//                     "createdAt": "2024-11-14T17:32:26.000Z",
//                     "updatedAt": "2024-11-14T17:32:26.000Z"
//                 }
//             ],
//             "Region": {
//                 "id": 1,
//                 "name": "Al Riadh",
//                 "description": "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//                 "createdAt": "2024-10-28T18:18:31.000Z",
//                 "updatedAt": "2024-10-28T18:18:31.000Z"
//             },
//             "Prices": [
//                 {
//                     "id": 89,
//                     "listing_id": 93,
//                     "price_per_hour": 1200,
//                     "date_specific_price": [],
//                     "min_hours": 1,
//                     "max_hours": 2,
//                     "createdAt": "2024-11-11T12:40:26.000Z",
//                     "updatedAt": "2024-11-11T12:40:26.000Z",
//                     "min_price": 1200,
//                     "max_price": 2400
//                 }
//             ],
//             "Reviews": [
//                 {
//                     "id": 9,
//                     "listing_id": 93,
//                     "user_id": 14,
//                     "review_content": "",
//                     "route_experience": 0,
//                     "value": 0,
//                     "communication": 0,
//                     "vessel_equipment": 0,
//                     "departure_return": 0,
//                     "listing_accuracy": 0,
//                     "createdAt": "2024-11-14T17:29:43.000Z",
//                     "updatedAt": "2024-11-14T17:29:43.000Z"
//                 },
//                 {
//                     "id": 8,
//                     "listing_id": 93,
//                     "user_id": 14,
//                     "review_content": "",
//                     "route_experience": 0,
//                     "value": 0,
//                     "communication": 0,
//                     "vessel_equipment": 0,
//                     "departure_return": 0,
//                     "listing_accuracy": 0,
//                     "createdAt": "2024-11-14T17:25:57.000Z",
//                     "updatedAt": "2024-11-14T17:25:57.000Z"
//                 },
//                 {
//                     "id": 7,
//                     "listing_id": 93,
//                     "user_id": 14,
//                     "review_content": "",
//                     "route_experience": 0,
//                     "value": 0,
//                     "communication": 0,
//                     "vessel_equipment": 0,
//                     "departure_return": 0,
//                     "listing_accuracy": 0,
//                     "createdAt": "2024-11-14T17:25:48.000Z",
//                     "updatedAt": "2024-11-14T17:25:48.000Z"
//                 },
//                 {
//                     "id": 6,
//                     "listing_id": 93,
//                     "user_id": 14,
//                     "review_content": "",
//                     "route_experience": 0,
//                     "value": 0,
//                     "communication": 0,
//                     "vessel_equipment": 0,
//                     "departure_return": 0,
//                     "listing_accuracy": 0,
//                     "createdAt": "2024-11-14T17:25:10.000Z",
//                     "updatedAt": "2024-11-14T17:25:10.000Z"
//                 },
//                 {
//                     "id": 5,
//                     "listing_id": 93,
//                     "user_id": 14,
//                     "review_content": "vbnghn bnfg gjhg jghj ghjdghjd hjghjhj",
//                     "route_experience": 2,
//                     "value": 2.4,
//                     "communication": 5,
//                     "vessel_equipment": 1,
//                     "departure_return": 2,
//                     "listing_accuracy": 2,
//                     "createdAt": "2024-11-14T17:23:27.000Z",
//                     "updatedAt": "2024-11-14T17:23:27.000Z"
//                 }
//             ],
//             "Features": [
//                 {
//                     "id": 6,
//                     "name": "test test test",
//                     "image": "uploads\\features\\1730308437171-hirbae.jpg",
//                     "createdAt": "2024-10-30T17:13:57.000Z",
//                     "updatedAt": "2024-10-30T17:13:57.000Z",
//                     "ListingFeatures": {
//                         "createdAt": "2024-11-11T12:40:26.000Z",
//                         "updatedAt": "2024-11-11T12:40:26.000Z",
//                         "feature_id": 6,
//                         "listing_id": 93
//                     }
//                 },
//                 {
//                     "id": 3,
//                     "name": "Bath",
//                     "image": "uploads\\features\\1730308411205-hirbae.jpg",
//                     "createdAt": "2024-10-30T17:13:31.000Z",
//                     "updatedAt": "2024-10-30T17:13:31.000Z",
//                     "ListingFeatures": {
//                         "createdAt": "2024-11-11T12:40:26.000Z",
//                         "updatedAt": "2024-11-11T12:40:26.000Z",
//                         "feature_id": 3,
//                         "listing_id": 93
//                     }
//                 }
//             ],
//             "user": {
//                 "id": 15,
//                 "name": "chiheb",
//                 "surname": "rahmouni",
//                 "email": "chihebrahmouni31@gmail.com",
//                 "password": "$2b$10$Esk8sS38Ah.Kmdm3iqlHsuNFrF.KeMBlR5LTnSj4xUMZbondnK7Ja",
//                 "phoneNumber": "+96687538",
//                 "profilePicture": "uploads\\avatars\\1731328879163.png",
//                 "dateOfBirth": null,
//                 "address": null,
//                 "isAuthorized": "none",
//                 "role": "user",
//                 "lastLogin": null,
//                 "isVerified": false,
//                 "preferences": null,
//                 "block": false,
//                 "suspend": false,
//                 "contact": true,
//                 "createdAt": "2024-11-11T12:11:20.000Z",
//                 "description": "im ready",
//                 "languageSpoken": "English",
//                 "updatedAt": "2024-11-11T12:41:19.000Z"
//             },
//             "totalReviews": 5
//         }
//     ],
//     "pagination": {
//         "totalItems": 1,
//         "totalPages": 1,
//         "currentPage": 1,
//         "itemsInCurrentPage": 1
//     }
// }