import React from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


interface ShipTypeCompProps {
  shipType: any;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const ShipTypeComp: React.FC<ShipTypeCompProps> = ({
  shipType,
  selected,
  setSelected,
}) => {

  const { i18n } = useTranslation();

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 cursor-pointer`}
      onClick={() => setSelected(shipType.id)}
    >
      <LazyLoadImage
        src={`${import.meta.env.VITE_SERVER_URL_CATEGORY}/${shipType.image}`}
        effect="blur"
        className={`h-[20px] object-center object-cover lg:h-[30px] ${
          selected === shipType.id ? "" : "!opacity-50"
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
};

export default ShipTypeComp;
