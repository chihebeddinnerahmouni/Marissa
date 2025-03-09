import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";

interface AvailabilityProps { 
    availability: string;
    setAvailability: (value: string) => void;
}

const Availability:React.FC<AvailabilityProps> = ({availability, setAvailability}) => {
    const { t } = useTranslation();
    return (
      <div className="w-full">
        <p className="filterTitleCss">{t("availability")}</p>
        <div className="availabilty flex flex-col mt-3 gap-3 lg:mt-5">
          <Button onClick={() => setAvailability("now")} availability={availability} value="now" text={t("available_now")} />
          <Button onClick={() => setAvailability("all")} availability={availability} value="all" text={t("all")} />
        </div>
      </div>
    );
};

export default Availability;

const Button = ({
  onClick,
  availability,
  value,
  text

}: {
    onClick: () => void;
    availability: string;
    value: string;
    text: string;
  }) => { 
  
  return (
    <div className="inline-flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <div
        className={`w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] border-2 rounded-[5px] flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 ${
          availability === value
            ? "bg-main border-main shadow-md"
            : "bg-white border-greyBorder hover:shadow-lg"
        }`}
      >
        {availability === value && (
          <FaCheck className="text-sm text-white lg:text-base" />
        )}
      </div>
      <p className="text-sm text-writingGrey lg:text-base">{text}</p>
    </div>
  );
}
