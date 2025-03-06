import logo from "@/assets/files/logo";
import { Link, Outlet } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import isLoggedIn from "@/lib/isLogedin";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export const ListingDetailsContext = createContext<any>({});

const ListeBoatDetailsLayout = () => {
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [long, setLong] = useState(43.98);
  const [lat, setLat] = useState(23.95);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [category, setCategory] = useState<number>(0);
  const [region, setRegion] = useState<any>(0);
  const [guests, setGuests] = useState<any>(0);
  const [price, setPrice] = useState<any>("");
  const [minHours, setMinHours] = useState<any>(0);
  const [maxHours, setMaxHours] = useState<any>(0);
  const [specificDates, setSpecificDates] = useState<any>([]);
  const steps = 11;
  const navigate = useNavigate();
  const location = useLocation();
  const isUserIn = isLoggedIn();
  const hasSubmissions = useSelector((state: RootState) => state.user.user.hasSubmissions);
  const isBlocked = useSelector((state: RootState) => state.user.user.block);
  const { t } = useTranslation();


  useEffect(() => {
    if (!isUserIn && !hasSubmissions) return navigate("/");
    if (isBlocked) {
      Swal.fire({
        icon: "error",
        title: t("ops"),
        text: t("you_cant_send_inquiry_as_blocked_user"),
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      }).then(() => {
        navigate(`/?page=1`)
      });
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location]);

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center px-4 py-[100px] md:px-[80px] lg:px-[120px] md:pt-[00px] md:pb-10">
      <Link
        to="/"
        className="absolute top-0 left-0 md:top-4 md:left-4 text-white"
      >
        <img
          src={logo}
          className="w-[100px] h-[100px] object-cover object-center"
          alt="logo"
        />
      </Link>

      <div className="progress absolute top-0 w-full h-1">
        <div
          className={`progres-bar h-1 bg-main transition-all duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <ListingDetailsContext.Provider
        value={{
          setProgress,
          steps,
          name,
          setName,
          desc,
          setDesc,
          long,
          setLong,
          lat,
          setLat,
          selectedFeatures,
          setSelectedFeatures,
          selectedImages,
          setSelectedImages,
          category,
          setCategory,
          region,
          setRegion,
          guests,
          setGuests,
          price,
          setPrice,
          minHours,
          setMinHours,
          maxHours,
          setMaxHours,
          specificDates,
          setSpecificDates,
        }}
      >
        <Outlet />
      </ListingDetailsContext.Provider>
    </div>
  );
};

export default ListeBoatDetailsLayout;
