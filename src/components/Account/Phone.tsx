import { useTranslation } from "react-i18next";

const Phone = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="font-semibold">{t("phone")}</p>
      <input
        type="numeric"
        className="email bg-emptyInput w-[100%] p-1 rounded-[5px] border-1 border-darkGrey outline-none"
        placeholder={t("phone")}
      />
    </div>
  );
}

export default Phone;
