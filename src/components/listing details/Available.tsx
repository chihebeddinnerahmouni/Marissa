import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ChoiceButton from "./ChoiceButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const specialDates = [
  { id: 1, name: "Weekend" },
  { id: 2, name: "Weekdays" },
  { id: 3, name: "Public Holidays" },
  { id: 4, name: "Special Events" },
];




const Available = () => {
  
//   const name = "boat";
// const desc = "hayl";
// const long = 5.4031;
// const lat = 36.1665;
// const selectedFeatures = [4, 3];
// const selectedImages = [
//   {
//     file: new File([""], "hirbae.jpg", {
//       lastModified: 1729326517915,
//       lastModifiedDate: new Date("Sat Oct 19 2024 09:28:37 GMT+0100 (UTC+01:00)"),
//       webkitRelativePath: "",
//       size: 86771
//     }),
//     url: "blob:http://localhost:5173/0425b0cf-571d-4392-a1e5-c04e9765421c"
//   },
//   {
//     file: new File([""], "marissa landing.png", {
//       lastModified: 1729280074627,
//       lastModifiedDate: new Date("Fri Oct 18 2024 20:34:34 GMT+0100 (UTC+01:00)"),
//       webkitRelativePath: "",
//       size: 898304
//     }),
//     url: "blob:http://localhost:5173/686315fa-2673-4828-b70e-24242177401f"
//   },
//   {
//     file: new File([""], "Capture d’écran 2024-10-12 111929.png", {
//       lastModified: 1728728372083,
//       lastModifiedDate: new Date("Sat Oct 12 2024 11:19:32 GMT+0100 (UTC+01:00)"),
//       webkitRelativePath: "",
//       size: 31652
//     }),
//     url: "blob:http://localhost:5173/826f00a5-f8e2-4a7e-a7e1-ad41f45e42bb"
//   },
//   {
//     file: new File([""], "Capture d’écran 2024-10-11 121844.png", {
//       lastModified: 1728645527394,
//       lastModifiedDate: new Date("Fri Oct 11 2024 12:18:47 GMT+0100 (UTC+01:00)"),
//       webkitRelativePath: "",
//       size: 759035
//     }),
//     url: "blob:http://localhost:5173/2f272dc3-9316-486b-9d0c-c31ba62d8a09"
//   },
//   {
//     file: new File([""], "Capture d’écran 2024-10-11 003124.png", {
//       lastModified: 1728603089476,
//       lastModifiedDate: new Date("Fri Oct 11 2024 00:31:29 GMT+0100 (UTC+01:00)"),
//       webkitRelativePath: "",
//       size: 373699
//     }),
//     url: "blob:http://localhost:5173/bc31f1fe-2624-43a0-bb7a-2b4abf974e0d"
//   }
// ];
// const category = 3;
// const region = 1;
// const guests = 1;
// const price = 1200;
// const minHours = 2;
// const maxHours = 4;
// const specificDates = [
//   {
//     date: "2024-11-13",
//     max_hours: 4,
//     min_hours: 2,
//     price: 12000,
//   },
//   ];
  
  const {
    setProgress,
    steps,
    name,
    desc,
    long,
    lat,
    selectedFeatures,
    selectedImages,
    category,
    region,
    guests,
    price,
    minHours,
    maxHours,
    specificDates,
  } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
const [specificDatesOff, setSpecificDatesOff] = useState<{ start_date: string, end_date: string, reserved: boolean }[]>([]);
const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setProgress((100 / steps) * 11);
    // console.log("name", name);
    // console.log("desc", desc);
    // console.log("long", long);
    // console.log("lat", lat);
    // console.log("features", selectedFeatures);
    // console.log("selectedImages", selectedImages);
    // console.log("categories", category);
    // console.log("region", region);
    // console.log("guests", guests);
    // console.log("price", price);
    // console.log("minHours", minHours);
    // console.log("maxHours", maxHours);
    // console.log("SpeceficDates", specificDates);

  }, []);

  // selecting the dates
  const handleFeatureSelect = (featureId: string) => {
    setSelectedDates((prevSelected) =>
      prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId)
        : [...prevSelected, featureId]
    );
  };

  // for specific dates button
  const handleAddDate = () => {
    setShowForm(!showForm);
  };
  // saving the date from form
const handleSaveDate = () => {
  if (!startDate || !endDate) {
    return Swal.fire({
      title: "Oops...",
      text: "Please select valid start and end dates!",
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
  }
  const newDate = {
    start_date: startDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
    reserved: true,
  };
  setSpecificDatesOff([...specificDatesOff, newDate]);
  setShowForm(false);
  setStartDate(null);
  setEndDate(null);
};

  // continue buttom
  const handleContinue = () => {
      
      const pricesFinal = [
      {
        price_per_hour: price,
        date_specific_price: specificDates,
        min_hours: minHours,
        max_hours: maxHours,
      },
    ];

    

    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", desc);
    formData.append("latitude", lat.toString());
    formData.append("longitude", long.toString());
    formData.append("features", JSON.stringify(selectedFeatures));
    formData.append("category_id", category.toString());
    formData.append("region_id", region.toString());
    formData.append("guests", guests.toString());
    formData.append("price", JSON.stringify(pricesFinal));
    formData.append("availability", JSON.stringify(specificDatesOff));
    selectedImages.forEach((image: any) => {
      formData.append(`images`, image)
    })
      
        // send the data to the server
        const url = import.meta.env.VITE_SERVER_URL_LISTING;
        axios
          .post(`${url}/api/listing/listings`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

   
  };

  return (
    <div className="">
      <p className="mb-5 text-[25px] font-bold">{t("unavailable_to_work")}</p>

      <div className="flex flex-wrap gap-2 lg:gap-3">
        {specialDates.map((feature: any) => (
          <ChoiceButton
            key={feature.id}
            choice={feature.id}
            text={feature.name}
            value={selectedDates}
            setValue={handleFeatureSelect}
            checkValue={feature.id}
          />
        ))}
      </div>

      <button
        onClick={handleAddDate}
        className="mt-5 mb-5 text-main font-medium underline"
      >
        {t("add_specific_date")}
      </button>

      {showForm && (
        <div className="mb-5 p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col lg:items-center lg:flex-row bg-white">
          <div className="mb-5 w-full">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              {t("select_start_date")}
            </label>
            <DatePicker
              selected={startDate}
              minDate={new Date()}
              onChange={(date) => setStartDate(date)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-main focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out outline-none"
            />
          </div>
          <div className="mb-5 w-full">
            <label className="block mb-2 text-lg font-medium text-gray-700">
              {t("select_end_date")}
            </label>
            <DatePicker
              selected={endDate}
              minDate={startDate || new Date()}
              onChange={(date) => setEndDate(date)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-main focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out outline-none"
            />
          </div>
          <button
            onClick={handleSaveDate}
            className="w-[120px] h-12 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out"
          >
            {t("save_date")}
          </button>
        </div>
      )}

      <div className="mt-5">
        {specificDatesOff.map((specificDate, index) => (
          <div
            key={index}
            className="mb-2 p-3 border border-gray-300 rounded-lg"
          >
            <p>
              {t("date")}: {specificDate.start_date} / {specificDate.end_date}
            </p>
          </div>
        ))}
      </div>

      {/* {selectedImages.map((image: any, index: number) => (
        <img src={image.url} alt="image" key={index}/>
      ))} */}

      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default Available;

// import { useContext, useEffect, useState } from "react";
// import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
// import { useTranslation } from "react-i18next";
// import ContinueButton from "../Listing/ContinueButton";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import ChoiceButton from "./ChoiceButton";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";

// const specialDates = [
//   { id: 1, name: "Weekend" },
//   { id: 2, name: "Weekdays" },
//   { id: 3, name: "Public Holidays" },
//   { id: 4, name: "Special Events" },
// ];



// const Available = () => {
//   const { setProgress, steps } = useContext(ListingDetailsContext);
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [selectedDates, setSelectedDates] = useState<string[]>([]);
// const [specificDates, setSpecificDates] = useState<{ start_date: string, end_date: string, reserved: boolean }[]>([]);
// const [startDate, setStartDate] = useState<Date | null>(null);
// const [endDate, setEndDate] = useState<Date | null>(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     setProgress((100 / steps) * 11);
//   }, []);

//   // selecting the dates
//   const handleFeatureSelect = (featureId: string) => {
//     setSelectedDates((prevSelected) =>
//       prevSelected.includes(featureId)
//         ? prevSelected.filter((id) => id !== featureId)
//         : [...prevSelected, featureId]
//     );
//   };

//   // for specific dates button
//   const handleAddDate = () => {
//     setShowForm(!showForm);
//   };
//   // saving the date from form
// const handleSaveDate = () => {
//   if (!startDate || !endDate) {
//     return Swal.fire({
//       title: "Oops...",
//       text: "Please select valid start and end dates!",
//       customClass: {
//         confirmButton: "custom-confirm-button",
//       },
//     });
//   }
//   const newDate = {
//     start_date: startDate.toISOString().split("T")[0],
//     end_date: endDate.toISOString().split("T")[0],
//     reserved: true,
//   };
//   setSpecificDates([...specificDates, newDate]);
//   setShowForm(false);
//   setStartDate(null);
//   setEndDate(null);
// };

//   // continue buttom
//   const handleContinue = () => {
      
//     // retrieve all the data from session storage
//     const title = sessionStorage.getItem("Listing_details_name");
//     const description = sessionStorage.getItem("Listing_details_desc");
//     const lat = sessionStorage.getItem("Listing_details_lat");
//     const long = sessionStorage.getItem("Listing_details_long");
//     const features = sessionStorage.getItem("Listing_details_features");
//     const images = sessionStorage.getItem("Listing_details_images");
//     const categories = sessionStorage.getItem("Listing_details_categories");
//     const region = sessionStorage.getItem("Listing_details_region");
//     const guests = sessionStorage.getItem("Listing_details_guests");
//     const price = sessionStorage.getItem("Listing_details_price");
//     const maxHours = sessionStorage.getItem("Listing_details_maxHours");
//     const minHours = sessionStorage.getItem("Listing_details_minHours");
//     const specificDates = sessionStorage.getItem("Listing_details_specificDates");

//     //check if all the details are filled
//     const check = title && description && lat && long && features && images && categories && region && guests && price && maxHours && minHours && specificDates
//     if (!check) {
//       return Swal.fire({
//         title: "Oops...",
//         text: "Please fill all the details from previous steps!",
//         customClass: {
//           confirmButton: "custom-confirm-button",
//         },
//       });
//     }

//     // convert the required data to the required format
//     // const priceNumber = parseFloat(price);
//     // const maxHoursNumber = parseInt(maxHours);
//     // const minHoursNumber = parseInt(minHours);
//     // const imagesArray = JSON.parse(images);
//     // const specificDatesArray = JSON.parse(specificDates);


//     // const pricesFinal = [
//     //   {
//     //         price_per_hour: priceNumber,
//     //         date_specific_price: specificDatesArray,
//     //         min_hours: minHoursNumber,
//     //         max_hours: maxHoursNumber,
//     //   },
//     // ];
//     // const priceNumber = parseFloat(price);
//     // const maxHoursNumber = parseInt(maxHours);
//     // const minHoursNumber = parseInt(minHours);
//     const imagesArray = JSON.parse(images);
//     const specificDatesArray = JSON.parse(specificDates);
    
//     const pricesFinal = [
//       {
//         price_per_hour: price,
//         date_specific_price: specificDatesArray,
//         min_hours: minHours,
//         max_hours: maxHours,
//       },
//     ];

    

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("latitude", lat);
//     formData.append("longitude", long);
//     formData.append("features", features);
//     formData.append("category_id", categories);
//     formData.append("region_id", region);
//     formData.append("guests", guests);
//     formData.append("price", JSON.stringify(pricesFinal));
//     formData.append("availability", specificDates);
//     imagesArray.forEach((image: any) => {
//       formData.append(`images`, image)
//     })
      
//         // send the data to the server
//         const url = import.meta.env.VITE_SERVER_URL_LISTING;
//         axios
//           .post(`${url}/api/listing/listings`, formData, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//             },
//           })
//           .then((response) => {
//             console.log(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
        
//     // navigate("/boats-list/availability");
//   };

//   return (
//     <div className="">
//       <p className="mb-5 text-[25px] font-bold">{t("unavailable_to_work")}</p>

//       <div className="flex flex-wrap gap-2 lg:gap-3">
//         {specialDates.map((feature: any) => (
//           <ChoiceButton
//             key={feature.id}
//             choice={feature.id}
//             text={feature.name}
//             value={selectedDates}
//             setValue={handleFeatureSelect}
//             checkValue={feature.id}
//           />
//         ))}
//       </div>

//       <button
//         onClick={handleAddDate}
//         className="mt-5 mb-5 text-main font-medium underline"
//       >
//         {t("add_specific_date")}
//       </button>

//       {showForm && (
//         <div className="mb-5 p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col lg:items-center lg:flex-row bg-white">
//           <div className="mb-5 w-full">
//             <label className="block mb-2 text-lg font-medium text-gray-700">
//               {t("select_start_date")}
//             </label>
//             <DatePicker
//               selected={startDate}
//               minDate={new Date()}
//               onChange={(date) => setStartDate(date)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:border-main focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out outline-none"
//             />
//           </div>
//           <div className="mb-5 w-full">
//             <label className="block mb-2 text-lg font-medium text-gray-700">
//               {t("select_end_date")}
//             </label>
//             <DatePicker
//               selected={endDate}
//               minDate={startDate || new Date()}
//               onChange={(date) => setEndDate(date)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:border-main focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out outline-none"
//             />
//           </div>
//           <button
//             onClick={handleSaveDate}
//             className="w-[120px] h-12 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out"
//           >
//             {t("save_date")}
//           </button>
//         </div>
//       )}

//       <div className="mt-5">
//         {specificDates.map((specificDate, index) => (
//           <div
//             key={index}
//             className="mb-2 p-3 border border-gray-300 rounded-lg"
//           >
//             <p>
//               {t("date")}: {specificDate.start_date} / {specificDate.end_date}
//             </p>
//           </div>
//         ))}
//       </div>

//       <ContinueButton onClick={handleContinue} />
//     </div>
//   );
// };

// export default Available;

