import LoadingLine from "@/components/ui/LoadingLine";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OneBoatComp from "@/components/owner/OneBoatComp";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const OwnerBoatsCont = () => {

    const [loading, setLoading] = useState(true);
  const [boatsArray, setBoatsArray] = useState<any>([]);
  const [count, setCount] = useState(0);
    const navigate = useNavigate();
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1046px)" });
  const { t } = useTranslation();

  useEffect(() => {

    // setBoatsArray(boats.listings);
    // setCount(boats.count);  
    // setLoading(false);

    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    axios.get(`${url}/api/listing/owner/my-listings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setBoatsArray(res.data.listings);
        setCount(res.data.count);
        if (!myBoatId && !isMobile) {
          navigate(`/my-boats/${res.data.listings[0].id}`);
          setLoading(false);
          return;
        }
        setLoading(false);
      })
      .catch((err) => { 
        if (err.response.data.message === "Network Error") {
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

        // console.log(err);

        if (err.response.data.message === "No listings found for this user") {
          Swal.fire({
            icon: "error",
            title: t("ops"),
            text: t("u_have_no_listing_yet"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          }).then(() => {
            navigate("/?page=1");
          });
        }
      });
      
  }, []);

     if (loading) {
       return (
         <div className="items w-full flex flex-col gap-4 h-12 inboxListCss">
           <LoadingLine />
         </div>
       );
     }

  return (
    <div className="items w-full flex flex-col gap-4">
      <p className="mt-3">you have: {count} listings</p>
      {boatsArray.map((inboxItem: any, index: number) => (
        <OneBoatComp key={index} item={inboxItem} />
      ))}
    </div>
  );
};

export default OwnerBoatsCont;



// const boats = 
//   {
//     listings: [
//       {
//         id: 65,
//         title: "Beautiful Beachgfhgfh g",
//         description: "Enjoy a serene boat trip with scenic beach views.",
//         rating: 0,
//         latitude: 36.1907,
//         longitude: 5.4419,
//         validated: true,
//         blocked: false,
//         block_reason: "This is a test reason",
//         user_id: 4,
//         category_id: 3,
//         guests: 3,
//         region_id: 1,
//         createdAt: "2024-11-02T17:15:25.000Z",
//         updatedAt: "2024-11-05T11:53:15.000Z",
//         Images: [],
//         Benefits: [],
//         Availabilities: [
//           {
//             id: 95,
//             listing_id: 65,
//             start_date: "2024-12-01",
//             end_date: "2024-12-15",
//             reserved: true,
//             createdAt: "2024-11-05T11:53:36.000Z",
//             updatedAt: "2024-11-05T11:53:36.000Z",
//           },
//           {
//             id: 96,
//             listing_id: 65,
//             start_date: "2024-12-15",
//             end_date: "2024-12-16",
//             reserved: true,
//             createdAt: "2024-11-05T11:53:36.000Z",
//             updatedAt: "2024-11-05T11:53:36.000Z",
//           },
//         ],
//         Region: {
//           id: 1,
//           name: "Al Riadh",
//           description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//           createdAt: "2024-10-28T18:18:31.000Z",
//           updatedAt: "2024-10-28T18:18:31.000Z",
//         },
//         Prices: [
//           {
//             id: 51,
//             listing_id: 65,
//             price_per_hour: 250,
//             date_specific_price: [],
//             min_hours: 2,
//             max_hours: 6,
//             createdAt: "2024-11-05T11:53:36.000Z",
//             updatedAt: "2024-11-05T11:53:36.000Z",
//             min_price: 500,
//             max_price: 1500,
//           },
//         ],
//         Reviews: [],
//         Features: [
//           {
//             id: 4,
//             name: "test",
//             image: "uploads\\features\\1730308420735-hirbae.jpg",
//             createdAt: "2024-10-30T17:13:40.000Z",
//             updatedAt: "2024-10-30T17:13:40.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-02T17:15:25.000Z",
//               updatedAt: "2024-11-02T17:15:25.000Z",
//               feature_id: 4,
//               listing_id: 65,
//             },
//           },
//           {
//             id: 3,
//             name: "Bath",
//             image: "uploads\\features\\1730308411205-hirbae.jpg",
//             createdAt: "2024-10-30T17:13:31.000Z",
//             updatedAt: "2024-10-30T17:13:31.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-02T17:15:25.000Z",
//               updatedAt: "2024-11-02T17:15:25.000Z",
//               feature_id: 3,
//               listing_id: 65,
//             },
//           },
//           {
//             id: 2,
//             name: "حمام كامل\n",
//             image: "uploads\\features\\1730307320483-hirbae.jpg",
//             createdAt: "2024-10-30T16:55:20.000Z",
//             updatedAt: "2024-10-30T16:55:20.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-02T17:15:25.000Z",
//               updatedAt: "2024-11-02T17:15:25.000Z",
//               feature_id: 2,
//               listing_id: 65,
//             },
//           },
//           {
//             id: 7,
//             name: "chiheb",
//             image: "uploads\\features\\1730308455477-hirbae.jpg",
//             createdAt: "2024-10-30T17:14:15.000Z",
//             updatedAt: "2024-10-30T17:14:15.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-02T17:15:25.000Z",
//               updatedAt: "2024-11-02T17:15:25.000Z",
//               feature_id: 7,
//               listing_id: 65,
//             },
//           },
//         ],
//         user: {
//           id: 4,
//           name: "chiheb",
//           surname: "rahmouni",
//           email: "chihebrahmouni31@gmail.com",
//           password:
//             "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
//           phoneNumber: "+2130778731669",
//           profilePicture: "uploads\\avatars\\1730826334068.jpg",
//           dateOfBirth: null,
//           address: null,
//           isAuthorized: "none",
//           role: "user",
//           lastLogin: null,
//           isVerified: false,
//           preferences: null,
//           block: false,
//           suspend: false,
//           contact: true,
//           createdAt: "2024-11-05T12:20:13.000Z",
//           description: "im ready",
//           languageSpoken: "English",
//           updatedAt: "2024-11-05T17:05:34.000Z",
//         },
//         totalReviews: 0,
//       },
//       {
//         id: 66,
//         title: "Beautiful Beach Boat",
//         description: "Enjoy a serene boat trip with scenic beach views.",
//         rating: 0,
//         latitude: 25.277,
//         longitude: 55.2962,
//         validated: true,
//         blocked: false,
//         block_reason: "This is a test reason",
//         user_id: 4,
//         category_id: 2,
//         guests: 0,
//         region_id: 1,
//         createdAt: "2024-11-02T17:23:57.000Z",
//         updatedAt: "2024-11-02T17:24:06.000Z",
//         Images: [
//           {
//             id: 306,
//             listing_id: 66,
//             url: "uploads\\1730568236204-hirbae.jpg",
//             createdAt: "2024-11-02T17:23:57.000Z",
//             updatedAt: "2024-11-02T17:23:57.000Z",
//           },
//           {
//             id: 307,
//             listing_id: 66,
//             url: "uploads\\1730568236232-marissa landing.png",
//             createdAt: "2024-11-02T17:23:57.000Z",
//             updatedAt: "2024-11-02T17:23:57.000Z",
//           },
//           {
//             id: 308,
//             listing_id: 66,
//             url: "uploads\\1730568236575-Capture d’écran 2024-10-12 111929.png",
//             createdAt: "2024-11-02T17:23:57.000Z",
//             updatedAt: "2024-11-02T17:23:57.000Z",
//           },
//           {
//             id: 309,
//             listing_id: 66,
//             url: "uploads\\1730568236596-Capture d’écran 2024-10-11 121844.png",
//             createdAt: "2024-11-02T17:23:57.000Z",
//             updatedAt: "2024-11-02T17:23:57.000Z",
//           },
//           {
//             id: 310,
//             listing_id: 66,
//             url: "uploads\\1730568236848-hirbae.jpg",
//             createdAt: "2024-11-02T17:23:57.000Z",
//             updatedAt: "2024-11-02T17:23:57.000Z",
//           },
//         ],
//         Benefits: [],
//         Availabilities: [
//           {
//             id: 58,
//             listing_id: 66,
//             start_date: "2024-12-01",
//             end_date: "2024-12-15",
//             reserved: true,
//             createdAt: "2024-11-02T17:23:57.000Z",
//             updatedAt: "2024-11-02T17:23:57.000Z",
//           },
//           {
//             id: 59,
//             listing_id: 66,
//             start_date: "2024-12-15",
//             end_date: "2024-12-16",
//             reserved: true,
//             createdAt: "2024-11-02T17:23:57.000Z",
//             updatedAt: "2024-11-02T17:23:57.000Z",
//           },
//         ],
//         Region: {
//           id: 1,
//           name: "Al Riadh",
//           description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//           createdAt: "2024-10-28T18:18:31.000Z",
//           updatedAt: "2024-10-28T18:18:31.000Z",
//         },
//         Prices: [
//           {
//             id: 32,
//             listing_id: 66,
//             price_per_hour: 200,
//             date_specific_price: [
//               {
//                 date: "2024-12-25",
//                 price: 250,
//                 min_hours: 3,
//               },
//               {
//                 date: "2024-12-31",
//                 price: 300,
//                 min_hours: 2,
//               },
//             ],
//             min_hours: 2,
//             max_hours: 6,
//             createdAt: "2024-11-02T17:23:57.000Z",
//             updatedAt: "2024-11-02T17:23:57.000Z",
//             min_price: 400,
//             max_price: 1200,
//           },
//         ],
//         Reviews: [],
//         Features: [
//           {
//             id: 1,
//             name: "حمام كامل\n",
//             image:
//               "uploads\\features\\1730139516048-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-10-28T18:18:36.000Z",
//             updatedAt: "2024-10-28T18:18:36.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-02T17:23:57.000Z",
//               updatedAt: "2024-11-02T17:23:57.000Z",
//               feature_id: 1,
//               listing_id: 66,
//             },
//           },
//         ],
//         user: {
//           id: 4,
//           name: "chiheb",
//           surname: "rahmouni",
//           email: "chihebrahmouni31@gmail.com",
//           password:
//             "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
//           phoneNumber: "+2130778731669",
//           profilePicture: "uploads\\avatars\\1730826334068.jpg",
//           dateOfBirth: null,
//           address: null,
//           isAuthorized: "none",
//           role: "user",
//           lastLogin: null,
//           isVerified: false,
//           preferences: null,
//           block: false,
//           suspend: false,
//           contact: true,
//           createdAt: "2024-11-05T12:20:13.000Z",
//           description: "im ready",
//           languageSpoken: "English",
//           updatedAt: "2024-11-05T17:05:34.000Z",
//         },
//         totalReviews: 0,
//       },
//       {
//         id: 67,
//         title: "test ava",
//         description: "test",
//         rating: 0,
//         latitude: 36.1907,
//         longitude: 5.4419,
//         validated: true,
//         blocked: false,
//         block_reason: "This is a test reason",
//         user_id: 4,
//         category_id: 3,
//         guests: 3,
//         region_id: 1,
//         createdAt: "2024-11-02T17:45:43.000Z",
//         updatedAt: "2024-11-02T17:47:11.000Z",
//         Images: [
//           {
//             id: 311,
//             listing_id: 67,
//             url: "uploads\\1730569542620-hirbae.jpg",
//             createdAt: "2024-11-02T17:45:43.000Z",
//             updatedAt: "2024-11-02T17:45:43.000Z",
//           },
//           {
//             id: 312,
//             listing_id: 67,
//             url: "uploads\\1730569542649-marissa landing.png",
//             createdAt: "2024-11-02T17:45:43.000Z",
//             updatedAt: "2024-11-02T17:45:43.000Z",
//           },
//           {
//             id: 313,
//             listing_id: 67,
//             url: "uploads\\1730569543029-Capture dâÃ©cran 2024-10-12 111929.png",
//             createdAt: "2024-11-02T17:45:43.000Z",
//             updatedAt: "2024-11-02T17:45:43.000Z",
//           },
//           {
//             id: 314,
//             listing_id: 67,
//             url: "uploads\\1730569543032-Capture dâÃ©cran 2024-10-11 121844.png",
//             createdAt: "2024-11-02T17:45:43.000Z",
//             updatedAt: "2024-11-02T17:45:43.000Z",
//           },
//           {
//             id: 315,
//             listing_id: 67,
//             url: "uploads\\1730569543411-Chiheb eddine Rahmouni.png",
//             createdAt: "2024-11-02T17:45:43.000Z",
//             updatedAt: "2024-11-02T17:45:43.000Z",
//           },
//         ],
//         Benefits: [],
//         Availabilities: [
//           {
//             id: 60,
//             listing_id: 67,
//             start_date: "2024-11-02",
//             end_date: "2024-11-29",
//             reserved: true,
//             createdAt: "2024-11-02T17:45:43.000Z",
//             updatedAt: "2024-11-02T17:45:43.000Z",
//           },
//         ],
//         Region: {
//           id: 1,
//           name: "Al Riadh",
//           description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//           createdAt: "2024-10-28T18:18:31.000Z",
//           updatedAt: "2024-10-28T18:18:31.000Z",
//         },
//         Prices: [
//           {
//             id: 33,
//             listing_id: 67,
//             price_per_hour: 1200,
//             date_specific_price: [
//               {
//                 date: "2024-11-05",
//                 price: 1200,
//                 max_hours: 2,
//                 min_hours: 1,
//               },
//               {
//                 date: "2024-11-13",
//                 price: 1267,
//                 max_hours: 3,
//                 min_hours: 1,
//               },
//             ],
//             min_hours: 1,
//             max_hours: 3,
//             createdAt: "2024-11-02T17:45:43.000Z",
//             updatedAt: "2024-11-02T17:45:43.000Z",
//             min_price: 1200,
//             max_price: 3600,
//           },
//         ],
//         Reviews: [],
//         Features: [
//           {
//             id: 3,
//             name: "Bath",
//             image: "uploads\\features\\1730308411205-hirbae.jpg",
//             createdAt: "2024-10-30T17:13:31.000Z",
//             updatedAt: "2024-10-30T17:13:31.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-02T17:45:43.000Z",
//               updatedAt: "2024-11-02T17:45:43.000Z",
//               feature_id: 3,
//               listing_id: 67,
//             },
//           },
//           {
//             id: 2,
//             name: "حمام كامل\n",
//             image: "uploads\\features\\1730307320483-hirbae.jpg",
//             createdAt: "2024-10-30T16:55:20.000Z",
//             updatedAt: "2024-10-30T16:55:20.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-02T17:45:43.000Z",
//               updatedAt: "2024-11-02T17:45:43.000Z",
//               feature_id: 2,
//               listing_id: 67,
//             },
//           },
//         ],
//         user: {
//           id: 4,
//           name: "chiheb",
//           surname: "rahmouni",
//           email: "chihebrahmouni31@gmail.com",
//           password:
//             "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
//           phoneNumber: "+2130778731669",
//           profilePicture: "uploads\\avatars\\1730826334068.jpg",
//           dateOfBirth: null,
//           address: null,
//           isAuthorized: "none",
//           role: "user",
//           lastLogin: null,
//           isVerified: false,
//           preferences: null,
//           block: false,
//           suspend: false,
//           contact: true,
//           createdAt: "2024-11-05T12:20:13.000Z",
//           description: "im ready",
//           languageSpoken: "English",
//           updatedAt: "2024-11-05T17:05:34.000Z",
//         },
//         totalReviews: 0,
//       },
//       {
//         id: 68,
//         title: "Beautiful Beach Boat",
//         description: "Enjoy a serene boat trip with scenic beach views.",
//         rating: 0,
//         latitude: 25.277,
//         longitude: 55.2962,
//         validated: true,
//         blocked: false,
//         block_reason: "This is a test reason",
//         user_id: 4,
//         category_id: 2,
//         guests: 0,
//         region_id: 1,
//         createdAt: "2024-11-04T10:47:33.000Z",
//         updatedAt: "2024-11-04T10:50:55.000Z",
//         Images: [
//           {
//             id: 316,
//             listing_id: 68,
//             url: "uploads\\1730717253925-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-11-04T10:47:33.000Z",
//             updatedAt: "2024-11-04T10:47:33.000Z",
//           },
//           {
//             id: 317,
//             listing_id: 68,
//             url: "uploads\\1730717253931-fg0nyrfgc66o6499241o59oz76cu4mtb.jpg",
//             createdAt: "2024-11-04T10:47:33.000Z",
//             updatedAt: "2024-11-04T10:47:33.000Z",
//           },
//           {
//             id: 318,
//             listing_id: 68,
//             url: "uploads\\1730717253935-basketball-17.jpg",
//             createdAt: "2024-11-04T10:47:33.000Z",
//             updatedAt: "2024-11-04T10:47:33.000Z",
//           },
//           {
//             id: 319,
//             listing_id: 68,
//             url: "uploads\\1730717253935-fg0nyrfgc66o6499241o59oz76cu4mtb.jpg",
//             createdAt: "2024-11-04T10:47:33.000Z",
//             updatedAt: "2024-11-04T10:47:33.000Z",
//           },
//           {
//             id: 320,
//             listing_id: 68,
//             url: "uploads\\1730717253938-images.png",
//             createdAt: "2024-11-04T10:47:33.000Z",
//             updatedAt: "2024-11-04T10:47:33.000Z",
//           },
//         ],
//         Benefits: [],
//         Availabilities: [
//           {
//             id: 61,
//             listing_id: 68,
//             start_date: "2024-12-01",
//             end_date: "2024-12-15",
//             reserved: true,
//             createdAt: "2024-11-04T10:47:33.000Z",
//             updatedAt: "2024-11-04T10:47:33.000Z",
//           },
//           {
//             id: 62,
//             listing_id: 68,
//             start_date: "2024-12-15",
//             end_date: "2024-12-16",
//             reserved: true,
//             createdAt: "2024-11-04T10:47:33.000Z",
//             updatedAt: "2024-11-04T10:47:33.000Z",
//           },
//         ],
//         Region: {
//           id: 1,
//           name: "Al Riadh",
//           description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//           createdAt: "2024-10-28T18:18:31.000Z",
//           updatedAt: "2024-10-28T18:18:31.000Z",
//         },
//         Prices: [
//           {
//             id: 34,
//             listing_id: 68,
//             price_per_hour: 100,
//             date_specific_price: [
//               {
//                 date: "2024-12-25",
//                 price: 250,
//                 min_hours: 3,
//               },
//               {
//                 date: "2024-12-31",
//                 price: 300,
//                 min_hours: 2,
//               },
//             ],
//             min_hours: 2,
//             max_hours: 6,
//             createdAt: "2024-11-04T10:47:33.000Z",
//             updatedAt: "2024-11-04T10:47:33.000Z",
//             min_price: 200,
//             max_price: 600,
//           },
//         ],
//         Reviews: [],
//         Features: [
//           {
//             id: 1,
//             name: "حمام كامل\n",
//             image:
//               "uploads\\features\\1730139516048-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-10-28T18:18:36.000Z",
//             updatedAt: "2024-10-28T18:18:36.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-04T10:47:33.000Z",
//               updatedAt: "2024-11-04T10:47:33.000Z",
//               feature_id: 1,
//               listing_id: 68,
//             },
//           },
//         ],
//         user: {
//           id: 4,
//           name: "chiheb",
//           surname: "rahmouni",
//           email: "chihebrahmouni31@gmail.com",
//           password:
//             "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
//           phoneNumber: "+2130778731669",
//           profilePicture: "uploads\\avatars\\1730826334068.jpg",
//           dateOfBirth: null,
//           address: null,
//           isAuthorized: "none",
//           role: "user",
//           lastLogin: null,
//           isVerified: false,
//           preferences: null,
//           block: false,
//           suspend: false,
//           contact: true,
//           createdAt: "2024-11-05T12:20:13.000Z",
//           description: "im ready",
//           languageSpoken: "English",
//           updatedAt: "2024-11-05T17:05:34.000Z",
//         },
//         totalReviews: 0,
//       },
//       {
//         id: 69,
//         title: "Beautiful Beach Boat",
//         description: "Enjoy a serene boat trip with scenic beach views.",
//         rating: 0,
//         latitude: 25.277,
//         longitude: 55.2962,
//         validated: true,
//         blocked: false,
//         block_reason: "This is a test reason",
//         user_id: 4,
//         category_id: 2,
//         guests: 0,
//         region_id: 1,
//         createdAt: "2024-11-04T10:47:52.000Z",
//         updatedAt: "2024-11-04T10:51:02.000Z",
//         Images: [
//           {
//             id: 321,
//             listing_id: 69,
//             url: "uploads\\1730717272836-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-11-04T10:47:52.000Z",
//             updatedAt: "2024-11-04T10:47:52.000Z",
//           },
//           {
//             id: 322,
//             listing_id: 69,
//             url: "uploads\\1730717272840-fg0nyrfgc66o6499241o59oz76cu4mtb.jpg",
//             createdAt: "2024-11-04T10:47:52.000Z",
//             updatedAt: "2024-11-04T10:47:52.000Z",
//           },
//           {
//             id: 323,
//             listing_id: 69,
//             url: "uploads\\1730717272842-basketball-17.jpg",
//             createdAt: "2024-11-04T10:47:52.000Z",
//             updatedAt: "2024-11-04T10:47:52.000Z",
//           },
//           {
//             id: 324,
//             listing_id: 69,
//             url: "uploads\\1730717272842-fg0nyrfgc66o6499241o59oz76cu4mtb.jpg",
//             createdAt: "2024-11-04T10:47:52.000Z",
//             updatedAt: "2024-11-04T10:47:52.000Z",
//           },
//           {
//             id: 325,
//             listing_id: 69,
//             url: "uploads\\1730717272844-images.png",
//             createdAt: "2024-11-04T10:47:52.000Z",
//             updatedAt: "2024-11-04T10:47:52.000Z",
//           },
//         ],
//         Benefits: [],
//         Availabilities: [
//           {
//             id: 63,
//             listing_id: 69,
//             start_date: "2024-12-01",
//             end_date: "2024-12-15",
//             reserved: true,
//             createdAt: "2024-11-04T10:47:52.000Z",
//             updatedAt: "2024-11-04T10:47:52.000Z",
//           },
//           {
//             id: 64,
//             listing_id: 69,
//             start_date: "2024-12-15",
//             end_date: "2024-12-16",
//             reserved: true,
//             createdAt: "2024-11-04T10:47:52.000Z",
//             updatedAt: "2024-11-04T10:47:52.000Z",
//           },
//         ],
//         Region: {
//           id: 1,
//           name: "Al Riadh",
//           description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//           createdAt: "2024-10-28T18:18:31.000Z",
//           updatedAt: "2024-10-28T18:18:31.000Z",
//         },
//         Prices: [
//           {
//             id: 35,
//             listing_id: 69,
//             price_per_hour: 500,
//             date_specific_price: [
//               {
//                 date: "2024-12-25",
//                 price: 125,
//                 min_hours: 3,
//               },
//               {
//                 date: "2024-12-31",
//                 price: 140,
//                 min_hours: 2,
//               },
//             ],
//             min_hours: 2,
//             max_hours: 6,
//             createdAt: "2024-11-04T10:47:52.000Z",
//             updatedAt: "2024-11-04T10:47:52.000Z",
//             min_price: 1000,
//             max_price: 3000,
//           },
//         ],
//         Reviews: [],
//         Features: [
//           {
//             id: 1,
//             name: "حمام كامل\n",
//             image:
//               "uploads\\features\\1730139516048-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-10-28T18:18:36.000Z",
//             updatedAt: "2024-10-28T18:18:36.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-04T10:47:52.000Z",
//               updatedAt: "2024-11-04T10:47:52.000Z",
//               feature_id: 1,
//               listing_id: 69,
//             },
//           },
//         ],
//         user: {
//           id: 4,
//           name: "chiheb",
//           surname: "rahmouni",
//           email: "chihebrahmouni31@gmail.com",
//           password:
//             "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
//           phoneNumber: "+2130778731669",
//           profilePicture: "uploads\\avatars\\1730826334068.jpg",
//           dateOfBirth: null,
//           address: null,
//           isAuthorized: "none",
//           role: "user",
//           lastLogin: null,
//           isVerified: false,
//           preferences: null,
//           block: false,
//           suspend: false,
//           contact: true,
//           createdAt: "2024-11-05T12:20:13.000Z",
//           description: "im ready",
//           languageSpoken: "English",
//           updatedAt: "2024-11-05T17:05:34.000Z",
//         },
//         totalReviews: 0,
//       },
//       {
//         id: 70,
//         title: "Beautiful Beach Boat",
//         description: "Enjoy a serene boat trip with scenic beach views.",
//         rating: 0,
//         latitude: 25.277,
//         longitude: 55.2962,
//         validated: true,
//         blocked: false,
//         block_reason: "This is a test reason",
//         user_id: 4,
//         category_id: 2,
//         guests: 0,
//         region_id: 1,
//         createdAt: "2024-11-04T10:48:16.000Z",
//         updatedAt: "2024-11-04T10:51:06.000Z",
//         Images: [
//           {
//             id: 326,
//             listing_id: 70,
//             url: "uploads\\1730717296580-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-11-04T10:48:16.000Z",
//             updatedAt: "2024-11-04T10:48:16.000Z",
//           },
//           {
//             id: 327,
//             listing_id: 70,
//             url: "uploads\\1730717296584-fg0nyrfgc66o6499241o59oz76cu4mtb.jpg",
//             createdAt: "2024-11-04T10:48:16.000Z",
//             updatedAt: "2024-11-04T10:48:16.000Z",
//           },
//           {
//             id: 328,
//             listing_id: 70,
//             url: "uploads\\1730717296585-basketball-17.jpg",
//             createdAt: "2024-11-04T10:48:16.000Z",
//             updatedAt: "2024-11-04T10:48:16.000Z",
//           },
//           {
//             id: 329,
//             listing_id: 70,
//             url: "uploads\\1730717296585-fg0nyrfgc66o6499241o59oz76cu4mtb.jpg",
//             createdAt: "2024-11-04T10:48:16.000Z",
//             updatedAt: "2024-11-04T10:48:16.000Z",
//           },
//           {
//             id: 330,
//             listing_id: 70,
//             url: "uploads\\1730717296587-images.png",
//             createdAt: "2024-11-04T10:48:16.000Z",
//             updatedAt: "2024-11-04T10:48:16.000Z",
//           },
//         ],
//         Benefits: [],
//         Availabilities: [
//           {
//             id: 65,
//             listing_id: 70,
//             start_date: "2024-12-01",
//             end_date: "2024-12-15",
//             reserved: true,
//             createdAt: "2024-11-04T10:48:16.000Z",
//             updatedAt: "2024-11-04T10:48:16.000Z",
//           },
//           {
//             id: 66,
//             listing_id: 70,
//             start_date: "2024-12-15",
//             end_date: "2024-12-16",
//             reserved: true,
//             createdAt: "2024-11-04T10:48:16.000Z",
//             updatedAt: "2024-11-04T10:48:16.000Z",
//           },
//         ],
//         Region: {
//           id: 1,
//           name: "Al Riadh",
//           description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//           createdAt: "2024-10-28T18:18:31.000Z",
//           updatedAt: "2024-10-28T18:18:31.000Z",
//         },
//         Prices: [
//           {
//             id: 36,
//             listing_id: 70,
//             price_per_hour: 400,
//             date_specific_price: [
//               {
//                 date: "2024-12-25",
//                 price: 250,
//                 min_hours: 3,
//               },
//               {
//                 date: "2024-12-31",
//                 price: 140,
//                 min_hours: 2,
//               },
//             ],
//             min_hours: 2,
//             max_hours: 6,
//             createdAt: "2024-11-04T10:48:16.000Z",
//             updatedAt: "2024-11-04T10:48:16.000Z",
//             min_price: 800,
//             max_price: 2400,
//           },
//         ],
//         Reviews: [],
//         Features: [
//           {
//             id: 1,
//             name: "حمام كامل\n",
//             image:
//               "uploads\\features\\1730139516048-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-10-28T18:18:36.000Z",
//             updatedAt: "2024-10-28T18:18:36.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-04T10:48:16.000Z",
//               updatedAt: "2024-11-04T10:48:16.000Z",
//               feature_id: 1,
//               listing_id: 70,
//             },
//           },
//         ],
//         user: {
//           id: 4,
//           name: "chiheb",
//           surname: "rahmouni",
//           email: "chihebrahmouni31@gmail.com",
//           password:
//             "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
//           phoneNumber: "+2130778731669",
//           profilePicture: "uploads\\avatars\\1730826334068.jpg",
//           dateOfBirth: null,
//           address: null,
//           isAuthorized: "none",
//           role: "user",
//           lastLogin: null,
//           isVerified: false,
//           preferences: null,
//           block: false,
//           suspend: false,
//           contact: true,
//           createdAt: "2024-11-05T12:20:13.000Z",
//           description: "im ready",
//           languageSpoken: "English",
//           updatedAt: "2024-11-05T17:05:34.000Z",
//         },
//         totalReviews: 0,
//       },
//       {
//         id: 71,
//         title: "Beautiful Beach Boat",
//         description: "Enjoy a serene boat trip with scenic beach views.",
//         rating: 0,
//         latitude: 25.277,
//         longitude: 55.2962,
//         validated: true,
//         blocked: false,
//         block_reason: "This is a test reason",
//         user_id: 4,
//         category_id: 2,
//         guests: 0,
//         region_id: 1,
//         createdAt: "2024-11-04T10:49:31.000Z",
//         updatedAt: "2024-11-04T10:51:11.000Z",
//         Images: [
//           {
//             id: 331,
//             listing_id: 71,
//             url: "uploads\\1730717371089-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-11-04T10:49:31.000Z",
//             updatedAt: "2024-11-04T10:49:31.000Z",
//           },
//           {
//             id: 332,
//             listing_id: 71,
//             url: "uploads\\1730717371095-fg0nyrfgc66o6499241o59oz76cu4mtb.jpg",
//             createdAt: "2024-11-04T10:49:31.000Z",
//             updatedAt: "2024-11-04T10:49:31.000Z",
//           },
//           {
//             id: 333,
//             listing_id: 71,
//             url: "uploads\\1730717371104-basketball-17.jpg",
//             createdAt: "2024-11-04T10:49:31.000Z",
//             updatedAt: "2024-11-04T10:49:31.000Z",
//           },
//           {
//             id: 334,
//             listing_id: 71,
//             url: "uploads\\1730717371105-fg0nyrfgc66o6499241o59oz76cu4mtb.jpg",
//             createdAt: "2024-11-04T10:49:31.000Z",
//             updatedAt: "2024-11-04T10:49:31.000Z",
//           },
//           {
//             id: 335,
//             listing_id: 71,
//             url: "uploads\\1730717371108-images.png",
//             createdAt: "2024-11-04T10:49:31.000Z",
//             updatedAt: "2024-11-04T10:49:31.000Z",
//           },
//         ],
//         Benefits: [],
//         Availabilities: [
//           {
//             id: 67,
//             listing_id: 71,
//             start_date: "2024-12-01",
//             end_date: "2024-12-15",
//             reserved: true,
//             createdAt: "2024-11-04T10:49:31.000Z",
//             updatedAt: "2024-11-04T10:49:31.000Z",
//           },
//           {
//             id: 68,
//             listing_id: 71,
//             start_date: "2024-12-15",
//             end_date: "2024-12-16",
//             reserved: true,
//             createdAt: "2024-11-04T10:49:31.000Z",
//             updatedAt: "2024-11-04T10:49:31.000Z",
//           },
//         ],
//         Region: {
//           id: 1,
//           name: "Al Riadh",
//           description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
//           createdAt: "2024-10-28T18:18:31.000Z",
//           updatedAt: "2024-10-28T18:18:31.000Z",
//         },
//         Prices: [
//           {
//             id: 37,
//             listing_id: 71,
//             price_per_hour: 420,
//             date_specific_price: [
//               {
//                 date: "2024-12-25",
//                 price: 350,
//                 min_hours: 3,
//               },
//               {
//                 date: "2024-12-31",
//                 price: 320,
//                 min_hours: 2,
//               },
//             ],
//             min_hours: 2,
//             max_hours: 6,
//             createdAt: "2024-11-04T10:49:31.000Z",
//             updatedAt: "2024-11-04T10:49:31.000Z",
//             min_price: 840,
//             max_price: 2520,
//           },
//         ],
//         Reviews: [],
//         Features: [
//           {
//             id: 1,
//             name: "حمام كامل\n",
//             image:
//               "uploads\\features\\1730139516048-roberto-nickson-IOI3KCYsn0o-unsplash.jpg",
//             createdAt: "2024-10-28T18:18:36.000Z",
//             updatedAt: "2024-10-28T18:18:36.000Z",
//             ListingFeatures: {
//               createdAt: "2024-11-04T10:49:31.000Z",
//               updatedAt: "2024-11-04T10:49:31.000Z",
//               feature_id: 1,
//               listing_id: 71,
//             },
//           },
//         ],
//         user: {
//           id: 4,
//           name: "chiheb",
//           surname: "rahmouni",
//           email: "chihebrahmouni31@gmail.com",
//           password:
//             "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
//           phoneNumber: "+2130778731669",
//           profilePicture: "uploads\\avatars\\1730826334068.jpg",
//           dateOfBirth: null,
//           address: null,
//           isAuthorized: "none",
//           role: "user",
//           lastLogin: null,
//           isVerified: false,
//           preferences: null,
//           block: false,
//           suspend: false,
//           contact: true,
//           createdAt: "2024-11-05T12:20:13.000Z",
//           description: "im ready",
//           languageSpoken: "English",
//           updatedAt: "2024-11-05T17:05:34.000Z",
//         },
//         totalReviews: 0,
//       },
//     ],
//     count: 7,
//   }