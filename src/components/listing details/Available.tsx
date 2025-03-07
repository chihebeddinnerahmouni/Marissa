import { useContext, useEffect, useState, useCallback } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ChoiceButton from "./ChoiceButton";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import PageName from "./PageName";
import InputDate from "../ui/inputs/InputDate";
import ButtonFunc from "../ui/buttons/Button";
import { useMutation } from '@tanstack/react-query';

const sendData = async (data: any) => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const response = await axios.post(`${url}/api/listing/listings`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return response.data;
}

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
  const [specificDatesOff, setSpecificDatesOff] = useState<
    { start_date: string; end_date: string; reserved: boolean }[]
  >([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    const check = [
      name,
      desc,
      long,
      lat,
      category,
      region,
      guests,
      price,
      minHours,
      maxHours,
      specificDates,
    ];
    const checkFalse = check.some((item) => !item || item.lenght === 0);
    if (checkFalse) {
      return navigate("/boats-list/title");
    }
    setProgress((100 / steps) * 11);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      navigate("/?page=1");
    },
    onError: (error: any) => {
      const message =
        error.message === "Network error"
          ? t("network_error")
          : error.response.data.message || t("something_went_wrong");
      Swal.fire({
        title: t("ops"),
        text: message,
        icon: "error",
        showConfirmButton: false,
      });
    },
  })


  // for specific dates button
  const handleAddDate = useCallback(() => {
    setShowForm(!showForm);
  }, [showForm]);

  
  // saving the date from form
  const handleSaveDate = useCallback(() => {
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
      start_date: startDate,
      end_date: endDate,
      reserved: true,
    };
    setSpecificDatesOff([...specificDatesOff, newDate]);
    setShowForm(false);
    setStartDate("");
    setEndDate("");
  }, [startDate, endDate, specificDatesOff]);




  // continue button
  const handleContinue = () => {
    const pricesFinal = [
      {
        price_per_hour: price,
        date_specific_price: specificDates,
        min_hours: minHours,
        max_hours: maxHours,
      },
    ];
    const latString = lat.toString();
    const longString = long.toString();
    const categoryString = category.toString();
    const regionString = region.toString();
    const guestsString = guests.toString();

    const pricesFinalString = JSON.stringify(pricesFinal);
    const specificDatesOffString = JSON.stringify(specificDatesOff);
    const selectedFeaturesString = JSON.stringify(selectedFeatures);

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
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("images", selectedImages[i].file);
    }

    mutate(formData);
  };

  return (
    <div className="">
      <PageName text={t("unavailable_to_work")} />
      <Option
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />

      <button
        onClick={handleAddDate}
        className="mt-5 mb-5 text-main font-medium underline"
      >
        {t("add_specific_date")}
      </button>
      {showForm && (
        <Form
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleSaveDate={handleSaveDate}
          setShowForm={setShowForm}
          t={t}
        />
      )}
      <Table specificDatesOff={specificDatesOff} t={t} />

      <div className="mt-5">
        <ButtonFunc
          text={t("continue")}
          onClick={handleContinue}
          loading={isPending}
        />
      </div>
    </div>
  );
};

export default Available;



const Option = ({
  selectedDates,
  setSelectedDates,
}: {
    selectedDates: string[];
    setSelectedDates: any;
  }) => {
  
  
    const handleFeatureSelect = useCallback((featureId: string) => {
      setSelectedDates((prevSelected: any) =>
        prevSelected.includes(featureId)
          ? prevSelected.filter((id: any) => id !== featureId)
          : [...prevSelected, featureId]
      );
    }, []);

    return (
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
    );
  };


const Form = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSaveDate,
  setShowForm,
  t,
}: {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
    handleSaveDate: () => void;
    setShowForm: (showForm: boolean) => void;
  t: any;
}) => {
  return (
    <div className="mb-5 p-6 border border-gray-300 rounded-lg shadow-hoverShadow flex flex-col gap-4 lg:items-end lg:flex-row">
      <div className="w-full">
        <label className="block mb-1 text-lg font-medium text-gray-700">
          {t("select_start_date")}
        </label>
        <InputDate
          value={startDate}
          setValue={(e) => setStartDate(e.target.value)}
          minDate={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="w-full">
        <label className="block mb-1 text-lg font-medium text-gray-700">
          {t("select_end_date")}
        </label>
        <InputDate
          value={endDate}
          setValue={(e) => setEndDate(e.target.value)}
          minDate={startDate}
        />
      </div>
      <div className="mt-5 flex gap-2">
        <ButtonFunc
          text={t("cancel")}
          onClick={() => setShowForm(false)}
          color="grey"
        />
        <ButtonFunc
          text={t("save_date")}
          onClick={handleSaveDate}
          color="green"
        />
      </div>
    </div>
  );
};



const Table = ({ specificDatesOff, t }: { specificDatesOff: any, t: any }) => {

  return (
    <div className="mt-5">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-center">{t("start")}</th>
              <th className="p-2 text-center">{t("end")}</th>
            </tr>
          </thead>
          <tbody>
            {specificDatesOff.map((specificDate: any, index: number) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-2 text-center">{specificDate.start_date}</td>
                <td className="p-2 text-center">{specificDate.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}