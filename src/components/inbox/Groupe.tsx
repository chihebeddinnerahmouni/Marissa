import { IoPeopleSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Groupe = ({ details }: any) => {
    
    const { t } = useTranslation();


  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-hoverShadow">
      <div className="preferedDate flex items-center gap-4">
        <IoPeopleSharp className="text-writingGrey text-[30px]" />
        <div className="datesAgain">
          <p className="font-bold">{t("duration")}</p>
                  <p>{details.guests} {t("guests")}</p>
        </div>
      </div>
    </div>
  );
}

export default Groupe
