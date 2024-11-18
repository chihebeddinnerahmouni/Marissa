import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ListingContext } from "@/Layout/ListeBoatLayout";
import LoadingButton from "../ui/LoadingButton";



// not used
const contactDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setProgress } = useContext(ListingContext);
  const [firstName, setFirstName] = useState(sessionStorage.getItem("Listing_first_name") || "");
  const [lastName, setLastName] = useState(sessionStorage.getItem("Listing_last_name") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("Listing_email") || "");
  //   const [phone, setPhone] = useState("");
  const [isFirstNameMissing, setIsFirstNameMissing] = useState(false);
  const [isLastNameMissing, setIsLastNameMissing] = useState(false);
  const [isEmailMissing, setIsEmailMissing] = useState(false);
  //   const [isPhoneMissing, setIsPhoneMissing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProgress((100 / 5) * 5);
  }, []);

  const handleContinue = () => {
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
    // if (phone === "") {
    //   setIsPhoneMissing(true);
    //   isMissing = true;
    // }
    if (isMissing) return;

    
    sessionStorage.setItem("Listing_first_name", firstName);
    sessionStorage.setItem("Listing_last_name", lastName);
    sessionStorage.setItem("Listing_email", email);
    const whoAreYou = sessionStorage.getItem("Listing_who_are_you");
    const region = sessionStorage.getItem("Listing_region");
    const waterCraft = sessionStorage.getItem("Listing_watercraft");
    const almostDone = sessionStorage.getItem("Listing_almost_done");


    const check = !whoAreYou || !region || !waterCraft || !almostDone;
    if (!check) {
      setLoading(true);
        setTimeout(() => {
      setLoading(false);
      navigate("/boats-list/done");
    }, 2000);  
    } else {
      alert("All data is required, please check the previous steps");
    }

  };

  return (
    <div className="w-full md:w-[500px] mt-[150px]">
      <p className="text-[25px] font-bold">{t("your_contact_details")}</p>

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

      <div className="email mt-5 w-[320px] mb-8">
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


      <button
        className="w-[100px] h-[40px] flex justify-center items-center bg-main mt-4 text-white rounded-60 hover:bg-mainHover"
        onClick={handleContinue}
      >
        {loading ? (
          <LoadingButton />
        ) : (
          <p>{t("continue")}</p>
        )}
      </button>
    </div>
  );
};

export default contactDetails;
