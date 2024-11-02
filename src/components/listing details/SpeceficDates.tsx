import { useContext, useEffect, useState } from "react";
import { ListingDetailsContext } from "@/Layout/ListBoatDetailsLayout";
import { useTranslation } from "react-i18next";
import ContinueButton from "../Listing/ContinueButton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import NumbersHandlers from "../inquiry forms/NumbersHandlers";

interface SpecificDate {
    date: string;
    price: number;
    min_hours: number;
    max_hours: number;
}

const SpeceficDates = () => {
    const { setProgress, steps } = useContext(ListingDetailsContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [specificDates, setSpecificDates] = useState<SpecificDate[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const [price, setPrice] = useState(0);
    const [minHours, setMinHours] = useState(0);
    const [maxHours, setMaxHours] = useState(0);

    useEffect(() => {
        setProgress((100 / steps) * 10);
    }, []);

    const handleAddDate = () => {
        setShowForm(true);
    };

    const handleSaveDate = () => {
        const check = !date || price <= 0 || minHours <= 0 || maxHours <= 0;
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
            date: date.toISOString().split("T")[0],
            price,
            min_hours: minHours,
            max_hours: maxHours,
        };

        setSpecificDates([...specificDates, newDate]);
        setShowForm(false);
        setDate(null);
        setPrice(0);
        setMinHours(0);
        setMaxHours(0);
    };

  const handleContinue = () => {
      sessionStorage.setItem(
        "Listing_details_specificDates",
        JSON.stringify(specificDates)
      );
navigate("/boats-list/availability");
    }

    return (
      <div className="w-full md:w-[500px]">
        <p className="text-[25px] font-bold mb-5">
          {t("do_u_have_specefic_dates")}
        </p>

        <button
          onClick={handleAddDate}
          className="mb-5 text-main font-medium underline"
        >
          {t("add_specific_date")}
        </button>

        {/* {showForm && (
          <div className="mb-5 p-4 border border-gray-300 rounded">
            
            <div className="mb-5">
              <label className="block mb-2">{t("select_date")}</label>
              <DatePicker
                selected={date}
                minDate={new Date()}
                onChange={(date) => setDate(date)}
                className="w-full p-2 border border-gray-300 rounded outline-main"
              />
            </div>

            <div className="">
              <label className="block mb-2">{t("price_per_hour")}</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:border-main focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 ease-in-out transform outline-main"
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

            <button
              onClick={handleSaveDate}
              className="p-2 bg-green-500 text-white rounded"
            >
              {t("save_date")}
            </button>
          </div>
        )} */}
        {showForm && (
          <div className="mb-5 p-4 border border-gray-300 rounded">
            <div className="mb-5">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                {t("select_date")}
              </label>
              <input
                onChange={(e) => setDate(new Date(e.target.value))}
                type="date"
                id="date"
                min={new Date().toISOString().split("T")[0]}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="">
              <label
                htmlFor="pricePerHour"
                className="block mt-4 text-sm font-medium text-gray-700"
              >
                {t("price_per_hour")}
              </label>
              <input
                type="number"
                value={price}
                id="pricePerHour"
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-main"
                onChange={(e) =>
                  setPrice(
                    Number(e.target.value) >= 0 ? Number(e.target.value) : 0
                  )
                }
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

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSaveDate}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {t("save_date")}
              </button>
            </div>
          </div>
        )}

        <div className="mb-5">
          {specificDates.map((specificDate, index) => (
            <div
              key={index}
              className="mb-2 p-2 border border-gray-300 rounded"
            >
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

        <ContinueButton onClick={handleContinue} />
      </div>
    );
}

export default SpeceficDates;




