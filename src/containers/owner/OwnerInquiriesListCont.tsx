import LoadingLine from "@/components/ui/LoadingLine";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useMediaQuery } from "react-responsive";
// import Swal from "sweetalert2";
// import { useTranslation } from "react-i18next";
import InquiryOneDetails from "@/components/owner/InquiryOneDetails";

const OwnerInquiriesListCont = () => {
  const [loading, setLoading] = useState(true);
  const [inqueriesArray, setInquiriesArray] = useState<any>([]);
  const [count, setCount] = useState(0);
  // const navigate = useNavigate();
  // const { inqueryId } = useParams<{ inqueryId: string }>();
  // const isMobile = useMediaQuery({ query: "(max-width: 1046px)" });
  // const { t } = useTranslation();

  useEffect(() => {
    setInquiriesArray(inquiries.listings);
    setCount(inquiries.count);
    setLoading(false);

    // const url = import.meta.env.VITE_SERVER_URL_LISTING;
    // axios
    //   .get(`${url}/api/listing/owner/my-listings`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(res.data);
    //     setBoatsArray(res.data.listings);
    //     setCount(res.data.count);
    //     if (!inqueryId && !isMobile) {
    //       navigate(`/my-boats/${res.data.listings[0].id}`);
    //       setLoading(false);
    //       return;
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     if (err.message === "Network Error") {
    //       Swal.fire({
    //         icon: "error",
    //         title: t("network_error"),
    //         text: t("please_try_again"),
    //         customClass: {
    //           confirmButton: "custom-confirm-button",
    //         },
    //       }).then(() => {
    //         window.location.reload();
    //       });
    //     }
    //   });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <div className="items w-full flex flex-col gap-4 bg-white">
      <p>you have: {count} inquiries</p>
        {inqueriesArray.map((inboxItem: any, index: number) => (
            <InquiryOneDetails key={index} item={inboxItem} />
        ))}
    </div>
  );
};

export default OwnerInquiriesListCont;



const inquiries = 
  {
    listings: [
      {
        id: 65,
        title: "Beautiful Beachgfhgfh g",
        description: "Enjoy a serene boat trip with scenic beach views.",
        rating: 0,
        latitude: 36.1907,
        longitude: 5.4419,
        validated: true,
        blocked: false,
        block_reason: "This is a test reason",
        user_id: 4,
        category_id: 3,
        guests: 3,
        region_id: 1,
        createdAt: "2024-11-02T17:15:25.000Z",
        updatedAt: "2024-11-05T11:53:15.000Z",
        Images: [
                {
               url: "uploads\\features\\1730307320483-hirbae.jpg"
            }
        ],
        Benefits: [],
        Availabilities: [
          {
            id: 95,
            listing_id: 65,
            start_date: "2024-12-01",
            end_date: "2024-12-15",
            reserved: true,
            createdAt: "2024-11-05T11:53:36.000Z",
            updatedAt: "2024-11-05T11:53:36.000Z",
          },
          {
            id: 96,
            listing_id: 65,
            start_date: "2024-12-15",
            end_date: "2024-12-16",
            reserved: true,
            createdAt: "2024-11-05T11:53:36.000Z",
            updatedAt: "2024-11-05T11:53:36.000Z",
          },
        ],
        Region: {
          id: 1,
          name: "Al Riadh",
          description: "dfsdgflkmj fsd dfglkmdfjglmkdjf gdfg fqdlgjf ",
          createdAt: "2024-10-28T18:18:31.000Z",
          updatedAt: "2024-10-28T18:18:31.000Z",
        },
        Prices: [
          {
            id: 51,
            listing_id: 65,
            price_per_hour: 250,
            date_specific_price: [],
            min_hours: 2,
            max_hours: 6,
            createdAt: "2024-11-05T11:53:36.000Z",
            updatedAt: "2024-11-05T11:53:36.000Z",
            min_price: 500,
            max_price: 1500,
          },
        ],
        Reviews: [],
        Features: [
          {
            id: 4,
            name: "test",
            image: "uploads\\features\\1730308420735-hirbae.jpg",
            createdAt: "2024-10-30T17:13:40.000Z",
            updatedAt: "2024-10-30T17:13:40.000Z",
            ListingFeatures: {
              createdAt: "2024-11-02T17:15:25.000Z",
              updatedAt: "2024-11-02T17:15:25.000Z",
              feature_id: 4,
              listing_id: 65,
            },
          },
          {
            id: 3,
            name: "Bath",
            image: "uploads\\features\\1730308411205-hirbae.jpg",
            createdAt: "2024-10-30T17:13:31.000Z",
            updatedAt: "2024-10-30T17:13:31.000Z",
            ListingFeatures: {
              createdAt: "2024-11-02T17:15:25.000Z",
              updatedAt: "2024-11-02T17:15:25.000Z",
              feature_id: 3,
              listing_id: 65,
            },
          },
          {
            id: 2,
            name: "حمام كامل\n",
            image: "uploads\\features\\1730307320483-hirbae.jpg",
            createdAt: "2024-10-30T16:55:20.000Z",
            updatedAt: "2024-10-30T16:55:20.000Z",
            ListingFeatures: {
              createdAt: "2024-11-02T17:15:25.000Z",
              updatedAt: "2024-11-02T17:15:25.000Z",
              feature_id: 2,
              listing_id: 65,
            },
          },
          {
            id: 7,
            name: "chiheb",
            image: "uploads\\features\\1730308455477-hirbae.jpg",
            createdAt: "2024-10-30T17:14:15.000Z",
            updatedAt: "2024-10-30T17:14:15.000Z",
            ListingFeatures: {
              createdAt: "2024-11-02T17:15:25.000Z",
              updatedAt: "2024-11-02T17:15:25.000Z",
              feature_id: 7,
              listing_id: 65,
            },
          },
        ],
        user: {
          id: 4,
          name: "chiheb",
          surname: "rahmouni",
          email: "chihebrahmouni31@gmail.com",
          password:
            "$2b$10$YwQuV7647Uf9heF2gsiQwevN8jONFUT6YZdEmm8scjrCXuwTZiaL.",
          phoneNumber: "+2130778731669",
          profilePicture: "uploads\\avatars\\1730826334068.jpg",
          dateOfBirth: null,
          address: null,
          isAuthorized: "none",
          role: "user",
          lastLogin: null,
          isVerified: false,
          preferences: null,
          block: false,
          suspend: false,
          contact: true,
          createdAt: "2024-11-05T12:20:13.000Z",
          description: "im ready",
          languageSpoken: "English",
          updatedAt: "2024-11-05T17:05:34.000Z",
        },
        totalReviews: 0,
      }
    ],
    count: 7,
  }