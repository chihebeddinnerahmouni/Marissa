import { useTranslation } from "react-i18next"
import { LuSailboat } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";

const Top = () => {
    const { t } = useTranslation()
  return (
    <div className="bg-[#ffffff] p-4 w-full sticky top-0 flex justify-between items-center lg:w-[550px] xl:w-[650px]">
          <p className="text-[20px] font-medium text-writingGrey">{t("inquiry_sent")}</p>
          <div className="buttons flex items-center gap-3">
              <button className="flex flex-col items-center gap-2">
                  <LuSailboat className="text-[#3b3b3b] text-[25px]" />
                  <p className="text-[12px]">{t("trip_details")}</p>
              </button>
              <button className="flex flex-col items-center gap-2">
                  <MdOutlineEmail className="text-[#3b3b3b] text-[25px]" />
                  <p className="text-[12px]">{t("MESSAGES")}</p>
              </button>
          </div>
    </div>
  );
}

export default Top
