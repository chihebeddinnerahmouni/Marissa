import { useContext, useEffect, useState, useCallback } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NumbersHandlers from "../inquiry forms/NumbersHandlers";
import PageName from "./PageName";
import InputNumber from "@/components/ui/inputs/InputNumber";
import InputDate from "@/components/ui/inputs/InputDate";
import ButtonFunc from "@/components/ui/buttons/Button";


interface SpecificDate {
  date: string;
  price: number;
  min_hours: number;
  max_hours: number;
}

const SpeceficDates = () => {
  const {
    setProgress,
    steps,
    specificDates,
    setSpecificDates,
    name,
    desc,
    selectedFeatures,
    selectedImages,
    category,
    region,
    guests,
  } = useContext(ListingDetailsContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState<string>("");
  const [price, setPrice] = useState<any>("");
  const [minHours, setMinHours] = useState(0);
  const [maxHours, setMaxHours] = useState(0);

  useEffect(() => {
    const array = [
      name,
      desc,
      selectedFeatures,
      selectedImages,
      category,
      region,
      guests,
    ];
    if (array.some((item) => !item || item.length === 0)) {
      return navigate("/boats-list/title");
    }
    setProgress((100 / steps) * 10);
  }, []);

  const handleAddDate = () => {
    setShowForm(true);
  };

  const handleSaveDate = useCallback(() => {
    const check = !date || price <= 0 || maxHours <= 0;
    if (check) {
      return Swal.fire({
        title: "Oops...",
        text: "Please enter valid values for all fields!",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
    }
    if (minHours > maxHours) {
      return Swal.fire({
        title: "Oops...",
        text: "Minimum hours should be less than maximum hours!",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
    }
    const newDate: SpecificDate = {
      date: date,
      price,
      min_hours: minHours,
      max_hours: maxHours,
    };

    setSpecificDates([...specificDates, newDate]);
    setShowForm(false);
    setDate("");
    setPrice(0);
    setMinHours(0);
    setMaxHours(0);
  }, [date, price, minHours, maxHours]);

  const handleContinue = useCallback(() => {
    navigate("/boats-list/availability");
  }, []);

  return (
    <div className="w-full md:w-[580px] flex flex-col items-start ">
      <PageName text={t("do_u_have_specefic_dates")} />
      <button
        onClick={handleAddDate}
        className="mb-5 text-main font-bold hover:text-mainHover"
      >
        {t("add_specific_date")}
      </button>
      {showForm && (
        <Form
          date={date}
          setDate={setDate}
          price={price}
          setPrice={setPrice}
          minHours={minHours}
          setMinHours={setMinHours}
          maxHours={maxHours}
          setMaxHours={setMaxHours}
          setShowForm={setShowForm}
          handleSaveDate={handleSaveDate}
          t={t}
        />
      )}
      <Result specificDates={specificDates} t={t} />
      <ContinueButton onClick={handleContinue} />
    </div>
  );
};

export default SpeceficDates;

const Form = ({
  date,
  setDate,
  price,
  setPrice,
  minHours,
  setMinHours,
  maxHours,
  setMaxHours,
  setShowForm,
  handleSaveDate,
  t,
}: {
  date: string;
  setDate: (e: any) => void;
  price: number;
  setPrice: (e: any) => void;
  minHours: number;
  setMinHours: (e: any) => void;
  maxHours: number;
  setMaxHours: (e: any) => void;
  setShowForm: (e: any) => void;
  handleSaveDate: () => void;
  t: any;
}) => {
  return (
    <div className="mb-5 p-4 rounded w-full mx-auto shadow-hoverShadow">
      <div className="mb-5">
        <label
          htmlFor="date"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {t("select_date")}
        </label>
        <InputDate
          value={date}
          setValue={(e: any) => setDate(e.target.value)}
          minDate={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="">
        <label
          htmlFor="pricePerHour"
          className="block mt-4 mb-1 text-sm font-medium text-gray-700"
        >
          {t("price_per_hour")}
        </label>
        <InputNumber
          value={price.toString()}
          setValue={(e: any) => setPrice(e.target.value)}
          label="Enter price"
        />
      </div>

      <div className="prices w-full flex justify-evenly my-10">
        <div className="">
          <p className="block mb-2">{t("min_hours")}</p>
          <NumbersHandlers value={minHours} setValue={setMinHours} />
        </div>
        <div className="">
          <p className="block mb-2">{t("max_hours")}</p>
          <NumbersHandlers value={maxHours} setValue={setMaxHours} />
        </div>
      </div>

      <div className="mt-6 flex gap-2 justify-end">
        <div className="">
          <ButtonFunc
            text={t("cancel")}
            onClick={() => setShowForm(false)}
            color="gray"
          />
        </div>
        <div className="">
          <ButtonFunc
            text={t("save_date")}
            onClick={handleSaveDate}
            color="green"
          />
          </div>
        </div>
    </div>
  );
};

const Result = ({ specificDates, t }: { specificDates: any; t: any }) => {
  return (
    <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3 w-full">
      {specificDates.map((specificDate: any, index: any) => (
        <div key={index} className="p-2 border border-gray-300 rounded">
          <p>
            {t("date")}: {specificDate.date}
          </p>
          <p>
            {t("price")}: {specificDate.price}
          </p>
          <p>
            {t("min_hours")}: {specificDate.min_hours}
          </p>
          <p>
            {t("max_hours")}: {specificDate.max_hours}
          </p>
        </div>
      ))}
    </div>
  );
};
