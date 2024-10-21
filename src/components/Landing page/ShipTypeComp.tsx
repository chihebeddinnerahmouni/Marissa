import React from 'react'
import { useTranslation } from 'react-i18next';

interface ShipTypeCompProps {
  shipType: {
    name: string;
    image: string;
    };
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}


const ShipTypeComp: React.FC<ShipTypeCompProps> = ({ shipType, selected, setSelected }) => {
  
const { t } = useTranslation();

  return (
    <div
      className={`flex h-full flex-col items-center justify-center gap-1 cursor-pointer lg:gap-2 ${
        selected === shipType.name
          ? "border-b-[1px] border-b-writingMainDark"
          : ""
      }`}
      onClick={() => setSelected(shipType.name)}
    >
      <img
        src={shipType.image}
        className="w-[20px] h-[20px] object-center object-cover lg:w-[30px] lg:h-[30px]"
        alt="Type"
      />
      <p
        className={`text-[12px] font-medium  lg:text-sm ${
          selected === shipType.name
            ? "text-writingMainDark"
            : "text-writingGrey"
        }`}
      >
        {t(shipType.name)}
      </p>
    </div>
  );
}

export default ShipTypeComp
