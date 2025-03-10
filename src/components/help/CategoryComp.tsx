import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


interface CategoryCompProps {
    category: any;
    }

const CategoryComp: React.FC<CategoryCompProps> = ({ category }) => {
    
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  
  return (
    <div
      className={`w-full text-[15px] h-[55px] border border-writingGrey rounded-[15px] flex justify-center items-center cursor-pointer transition duration-300 ease-in-out transform hover:bg-main hover:border-main hover:text-white hover:shadow-lg lg:text-[17px]`}
      onClick={() => navigate(`/help/${category.id}`)}
    >
      {i18n.language === "en" ? category.name : category.arabic_name}
    </div>
  )
}

export default CategoryComp
