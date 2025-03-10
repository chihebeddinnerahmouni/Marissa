import { IoMdLocate } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Region = ({ region }: any) => {
  const { t,
    // i18n
  } = useTranslation();

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <IoMdLocate className="text-writingGrey text-[30px]" />
        <div className="datesAgain">
          <p className="font-bold">{t("region")}</p>
          {/* <p>{i18n.language === "ar" ? region.arabic_name : region.name }</p> */}
          <p>{region}</p>
        </div>
      </div>
    </div>
  );
};

export default Region;
