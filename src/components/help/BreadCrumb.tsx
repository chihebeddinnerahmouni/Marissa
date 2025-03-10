import { useTranslation } from 'react-i18next'
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";


const BreadCrumb = ({ selectedCategory }: { selectedCategory : any}) => {
  const { i18n, t } = useTranslation();


   const breadcrumbs = [
       <Link to="/help" className="text-main text-sm lg:text-base hover:underline">
         {t("help")}
       </Link>
     ,
     <Typography
       key="2"
       sx={{ color: "gray", fontSize: { xs: "14px", lg: "17px" } }}
     >
       {i18n.language === "ar"
         ? selectedCategory?.arabic_name
         : selectedCategory?.name}
     </Typography>,
   ];

  return (
    <div className="breadcrumb mb-10 flex items-center gap-1 text-sm lg:text-base">
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumb
