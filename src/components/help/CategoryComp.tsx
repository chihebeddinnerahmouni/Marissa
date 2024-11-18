import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


interface CategoryCompProps {
    category: any;
    }

const CategoryComp: React.FC<CategoryCompProps> = ({ category}) => {
    
  const { t } = useTranslation();
  const navigate = useNavigate();

  // console.log(category);
  
  return (
    <div
      className={`w-full text-[15px] h-[60px] border-1 border-black rounded-[15px] flex justify-center items-center hover:bg-main hover:border-none cursor-pointer hover:text-white lg:text-[17px]`}
      onClick={() => navigate(`/help/${category.id}`)}
    >
      {t(category.name)}
    </div>
  )
}

export default CategoryComp
