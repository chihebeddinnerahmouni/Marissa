import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";

const Phone = ({phone, setPhone}: any) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="font-semibold">{t("phone")}</p>
      {/* <input
        type="numeric"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="email bg-emptyInput w-[100%] p-1 rounded-[5px] border-1 border-darkGrey outline-none"
        placeholder={t("phone")}
      /> */}
      <PhoneInput
        country={"sa"}
        value={phone}
        onChange={(newPhone) => {
          setPhone(newPhone);
        }}
        containerClass="flex w-full "
        inputClass={`flex-grow border border-gray-300 rounded-r-[5px] px-2 focus:border-none focus:outline-main`}
        buttonClass="border border-gray-300 rounded-l-[5px] px-2"
        dropdownClass="bg-white border border-gray-300 rounded-[5px]"
      />
    </div>
  );
}

export default Phone;
