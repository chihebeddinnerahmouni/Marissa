import React from 'react'
import { useTranslation } from 'react-i18next';

interface ShipTypeCompProps {
  shipType: any;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}


const ShipTypeComp: React.FC<ShipTypeCompProps> = ({ shipType, selected, setSelected }) => {
  
const { i18n } = useTranslation();

  return (
    <div
      className={`flex pb-2 flex-col items-center justify-center gap-1 cursor-pointer lg:gap-2 ${
        selected === shipType.id ? "" : ""
      }`}
      onClick={() => setSelected(shipType.id)}
    >
      <img
        src={`${import.meta.env.VITE_SERVER_URL_CATEGORY}/${shipType.image}`}
        // className="w-[20px] h-[20px] object-center object-cover rounded lg:w-[30px] lg:h-[30px]"
        className={`max-w[40px] h-[20px] object-center object-cover rounded lg:w[30px] lg:h-[30px] ${
          selected === shipType.id ? "" : "opacity-50"
        }`}
        alt="Type"
      />
      <p
        className={`text-[12px] font-medium text-nowrap lg:text-sm ${
          selected === shipType.id ? "text-writingMainDark" : "text-writingGrey"
        }`}
      >
        {i18n.language === "ar" ? shipType.arabic_name : shipType.name}
      </p>
    </div>
  );
}

export default ShipTypeComp
