import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import NextButton from "./NextButton";
import { useNavigate } from "react-router-dom";
import { InquiryContext } from "../../Layout/InquiryLayout";




const Contact = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setProgress } = useContext(InquiryContext);

  useEffect(() => {
    setProgress((100/6)*6);
  }, []);


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFirstNameMissing, setIsFirstNameMissing] = useState(false);
  const [isLastNameMissing, setIsLastNameMissing] = useState(false);
  const [isEmailMissing, setIsEmailMissing] = useState(false);
  const [isPhoneMissing, setIsPhoneMissing] = useState(false);



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

      navigate(`/inquiry/${boatId}/done`);
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
            }
            }
            placeholder={t("first_name")}
            className="bg-emptyInput w-full h-8 px-1 rounded-[5px] border-1 border-gray-300 outline-writingMainDark"
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
            className="bg-emptyInput w-full h-8 px-1 rounded-[5px] border-1 border-gray-300 outline-writingMainDark"
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
          className="bg-emptyInput w-full h-8 px-1 rounded-[5px] border-1 border-gray-300 outline-writingMainDark"
        />
        {isEmailMissing && (
          <p className="text-red-500 text-[12px] mt-1">{t("enter_email")}</p>
        )}
      </div>

      <div className="phone w-[320px] mt-5">
        <input
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setIsPhoneMissing(false);
          }}
          placeholder={t("phone")}
          className="bg-emptyInput w-full h-8 px-1 rounded-[5px] border-1 border-gray-300 outline-writingMainDark"
        />
        {isPhoneMissing && (
          <p className="text-red-500 text-[12px] mt-1">{t("enter_phone")}</p>
        )}
      </div>

      <NextButton onClick={nextHandler} />
    </div>
  );
};

export default Contact;
