import { useTranslation } from "react-i18next";
import filter_capacity_array from "@/assets/files/Filter_capacity_array";



interface CapasityProps { 
    capacity: number;
    setCapacity: (value: number) => void;
}


const Capasity:React.FC<CapasityProps> = ({capacity, setCapacity}) => {

    const { t } = useTranslation();
    

    return (
      <div className="w-full">
        <p className="filterTitleCss">{t("cpacity")}</p>
        <div className="capacity mt-3 flex justify-around items-center lg:mt-5">
          {filter_capacity_array.map((capacityy, index) => (
            <button
              key={index}
              className={`w-[40px] h-[40px] rounded-10 border-1 ${
                capacityy === capacity
                  ? "border-main text-main"
                  : "text-writingGrey border-greyBorder"
              } hover:shadow-hoverShadow`}
              onClick={() => setCapacity(capacityy)}
            >
              {capacityy}
            </button>
          ))}
        </div>
      </div>
    );
};

export default Capasity;
