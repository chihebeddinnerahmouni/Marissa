import { useTranslation } from "react-i18next";




const Top = ({ currentPage, totalPages, totalListings }: any) => {

  const { t } = useTranslation();

  return (
    <div className="w-full ">
      <p className="font-semibold text-[26px]    lg:text-[25px]">
        {t("Boats_for_you")}
      </p>
      <div className="flex items-center gap-2 text-sm text-writingGrey mt-1">
        <span>
          {t("page")} {currentPage} {t("of")} {totalPages}
        </span>
        <div className="w-1 h-1 rounded-50 bg-writingGrey"></div>
        <span>{totalListings} {t("listing")}</span>
      </div>
    </div>
  );
};

export default Top;
