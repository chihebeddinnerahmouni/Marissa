import logo from "@/assets/files/logo";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { useState, useEffect, createContext } from "react";
import ContactUs from "@/components/help/ContactUs";
import axios from "axios";
import LoadingLine from "@/components/ui/LoadingLine";
import { useParams, useNavigate } from "react-router-dom";


export const HelpContext = createContext<any>(null);




const HelpLayout = () => {
  const { t } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<any>("");
  const url = import.meta.env.VITE_SERVER_URL_HELP;
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  





  useEffect(() => {
    axios
      .get(`${url}/categories`)
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        setCategories(res.data);

         if (category) {
           const categoryExists = res.data.some(
             (element: { id: number }) => element.id === Number(category)
           );
           if (!categoryExists) {
            return navigate("/help");
           } else {
                     const name = res.data.find(
                       (element: { id: number }) =>
                         element.id === Number(category)
                     ).name;
                      setCategoryName(name);
           }
         }
       
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [navigate, category]);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div> 

    )
  }

  return (

    <HelpContext.Provider value={{ categories , categoryName}}>
    <div className="w-full min-h-screen pt-[100px] pb-5 lg:pt-[150px]">
      <header className="bg-white w-full fixed top-0 h-[65px] z-10 shadow-bottomShadow px-4  flex items-center justify-between md:px-10 lg:h-20">
        <Link to="/" className="text-white h-full">
          <img
            src={logo}
            className="h-full object-cover object-center"
            alt="logo"
          />
        </Link>

        <div className="flex items-center gap-5">
          <button className="text-sm text-main font-semibold" onClick={()=>setIsContactOpen(!isContactOpen)}>
            {t("contact_us")}
          </button>
          <Link to="/" className="text-sm text-writingGrey font-semibold">
            <FaHome className="text-writingMainDark text-[18px] opacity-50" />
          </Link>
        </div>
        {isContactOpen && <ContactUs isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} /> }
      </header>
      <Outlet />
      </div>
    </HelpContext.Provider> 
  );
};

export default HelpLayout;
