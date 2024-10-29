import { useTranslation } from "react-i18next";

const PricesComp = ({ price }: any) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex justify-between items-center">
      <p className="text-sm font-semibold text-writingMainDark lg:text-base">
        {price.date}
      </p>
      <p className="text-sm text-writingGrey font-medium lg:text-base">
        ${price.price}
      </p>
      <p className="text-sm text-writingGrey font-medium lg:text-base">
        {price.min_hours} {t("hours")}
      </p>
    </div>
  );
};

export default PricesComp;
