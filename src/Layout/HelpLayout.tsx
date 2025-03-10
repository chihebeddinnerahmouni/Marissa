import logo from "@/assets/files/logo";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { useState, useEffect, createContext } from "react";
import ContactUs from "@/components/help/ContactUs";
import axios from "axios";
import LoadingLine from "@/components/ui/LoadingLine";
import { useParams, useNavigate } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {axios_error_handler} from "@/functions/axios_error_handler";




export const HelpContext = createContext<any>(null);
const fetshCategories = async () => {
  const url = import.meta.env.VITE_SERVER_URL_HELP as string;
  const res = await axios.get(`${url}/categories`);
  return res.data;
}

const HelpLayout = () => {
  const { t } = useTranslation();
  const [categoryName, setCategoryName] = useState<any>("");
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  

  const { data: categories, isLoading, error, isSuccess } = useQuery({
    queryKey: ["getHelpCategories"],
    queryFn: fetshCategories,
  })
  
  useEffect(() => { 
    error && axios_error_handler(error, t);
  }, [error])

  useEffect(() => { 
    if (category) {
      const categoryExists = categories.some(
        (element: { id: number }) => element.id === Number(category)
      );
      if (!categoryExists) {
        return navigate("/help");
      } else {
        const name = categories.find(
          (element: { id: number }) =>
            element.id === Number(category)
        ).name;
        setCategoryName(name);
      }
    }
  }, [isSuccess])

  if (error) return <div className="w-full h-screen"></div>;

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div> 

    )
  }

  return (

    <HelpContext.Provider value={{ categories , categoryName}}>
    <div className="w-full min-h-screen pt-[100px] pb-5 lg:pt-[150px]">
      <header className="bg-white w-full fixed top-0 h-[65px] z-10 shadow-bottomShadow px-4 flex items-center justify-between md:px-10 lg:h-[70px]">
        <Logo />
        <Buttons t={t} />
      </header>
      <Outlet />
      </div>
    </HelpContext.Provider> 
  );
};

export default HelpLayout;


const Logo = () => {
  return (
    <Link to="/" className="text-white">
      <img
        src={logo}
        className="h-[40px] object-cover object-center"
        alt="logo"
      />
    </Link>
  );
}


const Buttons = ({t}: {t: any}) => { 
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  return (
    <>
      <div className="flex items-center gap-5">
        <button
          className="text-sm text-main font-semibold"
          onClick={() => setIsContactOpen(!isContactOpen)}
        >
          {t("contact_us")}
        </button>
        <Link to="/" className="text-sm text-writingGrey font-semibold">
          <FaHome className="text-writingMainDark text-[18px] opacity-50" />
        </Link>
      </div>
      {isContactOpen && (
        <ContactUs
          setIsContactOpen={setIsContactOpen}
        />
      )}
    </>
  );
}
