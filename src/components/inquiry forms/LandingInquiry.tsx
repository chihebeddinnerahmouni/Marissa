import { useTranslation } from 'react-i18next'
import { FaQuestion } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LandingInquiry = () => {

    const { t } = useTranslation();
    const { boatId } = useParams<{ boatId: string }>();
    const navigate = useNavigate();

    const continueFunction = () => {
    navigate(`/inquiry/${boatId}/duration`);
    };


  return (
    <div className="w-full h-[100vh] bg-white shadow-hardShadow flex flex-col py-6 items-center justify-center md:rounded-10 md:w-[450px] md:h-auto">
      <div className="all flex flex-col items-center w-[360px]">
        <p className="text-lg font-semibold text-writingMainDark">
          {t("send_a_booking_inquiry")}
        </p>
        <FaQuestion className="text-5xl text-mainBlue my-5" />
        <p className="text-sm text-writingGrey font-medium mt-3 text-center">
          {t("inquiry_text")}
        </p>

        <button
                  className="w-[320px] h-10 bg-mainBlue text-white bg-main rounded-[5px] mt-5"
                  onClick={continueFunction}
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
}

export default LandingInquiry
