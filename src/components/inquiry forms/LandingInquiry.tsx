import { useTranslation } from "react-i18next";
import { FaQuestion } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layout/authLayout";
import ButtonFunc from "@/components/ui/buttons/Button";

const LandingInquiry = () => {
  const { t } = useTranslation();
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();

  const continueFunction = () => {
    navigate(`/inquiry/${boatId}/duration`);
  };

  return (
    <AuthLayout title={t("send_a_booking_inquiry")}>
      <div className="all flex flex-col items-center px-4">
        <FaQuestion className="text-5xl text-mainBlue my-5" />
        <p className="text-sm text-writingGrey font-medium mt-3 text-center">
          {t("inquiry_text")}
        </p>
        <div className="mt-5 w-full">
          <ButtonFunc text={t("continue")} onClick={continueFunction} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default LandingInquiry;
