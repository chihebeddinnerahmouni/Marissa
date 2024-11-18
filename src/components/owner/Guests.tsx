import { IoPeopleSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Guests = ({ guests }: any) => {
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <IoPeopleSharp className="text-writingGrey text-[30px]" />
        <div className="datesAgain">
          <p className="font-bold">{t("guests")}</p>
          <p>{guests}</p>
        </div>
      </div>
    </div>
  );
};

export default Guests;
