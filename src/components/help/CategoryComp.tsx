import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


interface CategoryCompProps {
    category: string;
    index: number;
    }

const CategoryComp: React.FC<CategoryCompProps> = ({ category, index}) => {
    
  const { t } = useTranslation();
  const navigate = useNavigate();


  return (
    <div
      className={`w-full text-[15px] h-[60px] border-1 border-black rounded-[15px] flex justify-center items-center hover:bg-main hover:border-none cursor-pointer hover:text-white lg:text-[17px] ${index === 2 ? 'lg:col-span-2' : ''}`}
      onClick={() => navigate(`/help/${category}/1`)}
    >
      {t(category)}
    </div>
  )
}

export default CategoryComp
