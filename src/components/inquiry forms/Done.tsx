import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../Layout/authLayout";
import ButtonFunc from "@/components/ui/buttons/Button";

const Done = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const done = () => {
    navigate(`/inbox`);
  };

  return (
    // <div className="w-full h-[100vh] bg-white shadow-hardShadow flex flex-col py-6 items-center justify-center md:rounded-10 md:w-[450px] md:h-auto">
    <AuthLayout title={t("inquiry_sent!")}>
      <div className="all flex flex-col items-center w-full">
        <IoCheckmarkDoneSharp className="text-5xl text-mainBlue my-5" />
        <p className="text-sm text-writingGrey font-medium mt-3 text-center">
          {t("we’ll_contact_you_with_options_for_your_trip_soon")}
        </p>
        <div className="mt-5 w-full">
          <ButtonFunc text={t("done")} onClick={done} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Done;
