import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ChoiceButton from "./ChoiceButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import LoadingButton from "../ui/LoadingButton";
import PageName from "./PageName";



const specialDates = [
  { id: 1, name: "Weekend" },
  { id: 2, name: "Weekdays" },
  { id: 3, name: "Public Holidays" },
  { id: 4, name: "Special Events" },
];




const Available = () => {
  
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const check = [name, desc, long, lat, category, region, guests, price, minHours, maxHours, specificDates];
    const checkFalse = check.some((item) => !item || item.lenght === 0);
    if (checkFalse) {
      return navigate("/boats-list/title");
    }
    setProgress((100 / steps) * 11);
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
      title: t("ops"),
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
}

  // continue button
  const handleContinue = () => {
  setIsLoading(true);

  const pricesFinal = [
    {
      price_per_hour: price,
      date_specific_price: specificDates,
      min_hours: minHours,
      max_hours: maxHours,
    },
  ];

  // Convert only necessary fields to strings
  const latString = lat.toString();
  const longString = long.toString();
  const categoryString = category.toString();
  const regionString = region.toString();
  const guestsString = guests.toString();

  // Prepare JSON objects for complex data fields
  const pricesFinalString = JSON.stringify(pricesFinal);
    const specificDatesOffString = JSON.stringify(specificDatesOff);
    const selectedFeaturesString = JSON.stringify(selectedFeatures);

  // Create form data object
  const formData = new FormData();
  formData.append("title", name);
  formData.append("description", desc);
  formData.append("latitude", latString);
  formData.append("longitude", longString);
  formData.append("featureIds", selectedFeaturesString);
  formData.append("category_id", categoryString);
  formData.append("region_id", regionString);
  formData.append("guests", guestsString);
  formData.append("prices", pricesFinalString);
  formData.append("availability", specificDatesOffString);

  // Append images 
  for (let i = 0; i < selectedImages.length; i++) {
    formData.append("images", selectedImages[i].file);
  }

  // Send data to the server
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  axios
    .post(`${url}/api/listing/listings`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      Swal.fire({
        title: "Success!",
        text: "Your_listing_has been added successfully!",
        icon: "success",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
      setIsLoading(false);
      navigate("/?page=1");
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
};

  return (
    <div className="">
      <PageName text={t("unavailable_to_work")} />
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
        <div className="mb-5 p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col lg:items-end lg:flex-row lg:gap-2">
          <div className="w-full">
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
          <div className="w-full">
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
            className="min-w-[120px] h-12 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out"
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



      <button
        className="w-[100px] h-[40px] flex justify-center items-center bg-main mt-4 text-white rounded-60 hover:bg-mainHover"
        onClick={handleContinue}
        disabled={isLoading}
      >
        {/* {t("continue")} */}
        {isLoading ? <LoadingButton /> : t("continue")}
      </button>
    </div>
  );
};

export default Available;

