import { useTranslation } from "react-i18next";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";


const Blocked = ({ blocked }: any) => {
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm">
      <div className="preferedDate flex items-center gap-4">
        <p
          className={` text-[30px] ${
            blocked ? "text-red-500" : "text-green-500"
          }`}
        >
          {blocked ? <MdBlock /> : <CgUnblock />}
        </p>
        <p className="text-[18px] lg:text-[20px] font-medium text-writingGrey w-full">
          {blocked ? t("blocked") : t("not_blocked")}
        </p>
      </div>
    </div>
  );
};


export default Blocked;
