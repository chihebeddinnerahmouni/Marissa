import { GrValidate } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const Validated = ({ validated }: any) => {
  const { t } = useTranslation();
  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <p>
          <GrValidate
            className={` text-[30px] ${
              validated ? "text-green-500" : "text-red-500"
            }`}
          />
        </p>
        <p className="text-[18px] lg:text-[20px] font-medium text-writingGrey w-full">
          {validated ? t("validated") : t("not_validated")}
        </p>
      </div>
    </div>
  );
};

export default Validated;
