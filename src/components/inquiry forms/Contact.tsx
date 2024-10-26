import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InquiryContext } from "../../Layout/InquiryLayout";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingButton from "../ui/LoadingButton";



const Contact = () => {

  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setProgress } = useContext(InquiryContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFirstNameMissing, setIsFirstNameMissing] = useState(false);
  const [isLastNameMissing, setIsLastNameMissing] = useState(false);
  const [isEmailMissing, setIsEmailMissing] = useState(false);
  const [isPhoneMissing, setIsPhoneMissing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProgress((100/6)*6);
  }, []);





  const nextHandler = () => { 
    let isMissing = false;
    if (firstName === "") {
      setIsFirstNameMissing(true);
      isMissing = true;
    }
    if (lastName === "") {
      setIsLastNameMissing(true);
      isMissing = true;
    }
    if (email === "") {
      setIsEmailMissing(true);
      isMissing = true;
    }
    if (phone === "") {
      setIsPhoneMissing(true);
      isMissing = true;
    }
    if (isMissing) return;

    const inquiry_duration_hours = sessionStorage.getItem("inquiry_duration_hours");
    const inquiry_duration_minutes = sessionStorage.getItem("inquiry_duration_minutes");
    const inquiry_duration_nights = sessionStorage.getItem("inquiry_duration_nights");
    const inquiry_date = sessionStorage.getItem("inquiry_date");
    const inquiry_departure = sessionStorage.getItem("inquiry_departure");
    const inquiry_groupe_adultes = sessionStorage.getItem("inquiry_groupe_adultes");
    const inquiry_groupe_childrens = sessionStorage.getItem("inquiry_groupe_childrens");
    const inquiry_groupe_infants = sessionStorage.getItem("inquiry_groupe_infants");
    const inquiry_extra = sessionStorage.getItem("inquiry_extra");

    console.log('hours', inquiry_duration_hours);
    console.log('minutes', inquiry_duration_minutes);
    console.log('nights', inquiry_duration_nights);
    console.log('date', inquiry_date);
    console.log('departure', inquiry_departure);
    console.log('adultes', inquiry_groupe_adultes);
    console.log('childrens', inquiry_groupe_childrens);
    console.log('infants', inquiry_groupe_infants);
    console.log('extra', inquiry_extra);

    const check = !inquiry_duration_hours || !inquiry_duration_minutes || !inquiry_duration_nights || !inquiry_date || !inquiry_departure || !inquiry_groupe_adultes || !inquiry_groupe_childrens || !inquiry_groupe_infants || !inquiry_extra;
    if (check) return console.log("missing data");

    setLoading(true);
    setTimeout(() => {
      navigate(`/inquiry/${boatId}/done`);
    }, 2000);
    };


  return (
    <div className="all flex flex-col items-center">
      <p className="text-[22px] font-medium text-writingMainDark">
        {t("your_contact_details")}
      </p>

      {/* fields */}

      <div className="names flex w-[320px] gap-2 mt-10">
        <div className="firstName flex-grow">
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setIsFirstNameMissing(false);
            }}
            placeholder={t("first_name")}
            className="bg-emptyInput w-full h-8 px-1 rounded-[5px] border-1 border-gray-300 outline-main"
          />
          {isFirstNameMissing && (
            <p className="text-red-500 text-[12px] mt-1">
              {t("enter_first_name")}
            </p>
          )}
        </div>
        <div className="firstName flex-grow">
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setIsLastNameMissing(false);
            }}
            placeholder={t("last_name")}
            className="bg-emptyInput w-full h-8 px-1 rounded-[5px] border-1 border-gray-300 outline-main"
          />
          {isLastNameMissing && (
            <p className="text-red-500 text-[12px] mt-1">
              {t("enter_last_name")}
            </p>
          )}
        </div>
      </div>

      <div className="email mt-5 w-[320px]">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsEmailMissing(false);
          }}
          placeholder={t("email")}
          className="bg-emptyInput w-full h-8 px-1 rounded-[5px] border-1 border-gray-300 outline-main"
        />
        {isEmailMissing && (
          <p className="text-red-500 text-[12px] mt-1">{t("enter_email")}</p>
        )}
      </div>

      <div className="phone w-[320px] mt-5">
        <PhoneInput
          country={"sa"}
          value={phone}
          onChange={setPhone}
          containerClass="flex w-full "
          inputClass={`flex-grow border border-gray-300 rounded-r-[5px] px-2 focus:border-none focus:outline-main ${
            isPhoneMissing ? "border-red-400" : "border-gray-300"
          }`}
          buttonClass="border border-gray-300 rounded-l-[5px] px-2"
          dropdownClass="bg-white border border-gray-300 rounded-[5px]"
        />
        {isPhoneMissing && (
          <p className="text-red-500 text-[12px] mt-1">{t("enter_phone")}</p>
        )}
      </div>

      <button
        onClick={nextHandler}
        className="w-[320px] h-10 bg-mainBlue text-white bg-main rounded-[5px] mt-10"
      >
        {loading ? <LoadingButton /> : t("next")}
      </button>
    </div>
  );
};

export default Contact;
