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
        {/* <div className="capacity mt-3 flex justify-around items-center flex-wrap gap-2 lg:mt-5"> */}
        <div className="capacity mt-3 grid grid-cols-5 gap-y-2 place-items-center lg:mt-5">
          {filter_capacity_array.map((capacityy, index) => (
            <button
              key={index}
              className={`w-[40px] h-[40px] rounded-lg border ${
                capacityy === capacity
                  ? "border-main text-main bg-mainLight"
                  : "text-writingGrey border-greyBorder bg-white"
              } hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1`}
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
