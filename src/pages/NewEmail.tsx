import { useTranslation } from "react-i18next";

const NewEmail = () => {

    const { t } = useTranslation();


  return (
    <div className="w-full flex justify-center items-center h-screen py-0 px-4 md">
      <div className="content w-full md:w-[500px] flex flex-col items-center gap-3 lg:gap-5">
        <p className="text-[26px] font-semibold text-writingMainDark lg:text-[26px]">
          {t("change_email_address")}
        </p>
        <p className="text-base font-medium text-writingGrey text-center lg:text-[20px]">
          {t("new_email_address")}
        </p>

        <input
          type="email"
          placeholder={t("email")}
          className="w-full h-[40px] bg-emptyInput border border-darkGrey rounded-[5px] px-2 outline-main"
        />
        <button
          className="w-full h-[40px] bg-main rounded-[5px] text-white hover:bg-mainHover"
          //   onClick={go}
        >
          {t("send")}
        </button>
      </div>
    </div>
  );
}

export default NewEmail
