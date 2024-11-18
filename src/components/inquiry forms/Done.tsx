import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Done = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const done = () => {
    navigate(`/inbox`);
  };

  return (
    <div className="w-full h-[100vh] bg-white shadow-hardShadow flex flex-col py-6 items-center justify-center md:rounded-10 md:w-[450px] md:h-auto">
      <div className="all flex flex-col items-center w-[360px]">
        <p className="text-lg font-semibold text-writingMainDark">
          {t("inquiry_sent!")}
        </p>
        <IoCheckmarkDoneSharp className="text-5xl text-mainBlue my-5" />
        <p className="text-sm text-writingGrey font-medium mt-3 text-center">
          {t("we’ll_contact_you_with_options_for_your_trip_soon")}
        </p>

        <button
          className="w-[320px] h-10 bg-mainBlue text-white bg-main rounded-[5px] mt-5"
          onClick={done}
        >
          {t("done")}
        </button>
      </div>
    </div>
  );
};

export default Done;
