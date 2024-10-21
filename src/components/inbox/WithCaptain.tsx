import { GiCaptainHatProfile } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const WithCaptain = ({details}: any) => {


    const { t } = useTranslation();

    return (
      <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-hoverShadow">
        <div className="preferedDate flex items-center gap-4">
          <GiCaptainHatProfile className="text-writingGrey text-[30px]" />
          <div className="datesAgain">
            <p className="font-bold">{t("with_captain")}</p>
            <p className="text-sm">
              A captain is included in the price.
            </p>
          </div>
        </div>
      </div>
    );
};

export default WithCaptain;
