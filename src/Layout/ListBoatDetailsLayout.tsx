import logo from "@/assets/files/logo";
import { Link, Outlet } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import isLoggedIn from "@/lib/isLogedin";
import { useNavigate } from "react-router-dom";

export const ListingDetailsContext = createContext<any>({});

const ListeBoatDetailsLayout = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [region, setRegion] = useState<any>();
  const [guests, setGuests] = useState<any>(0);
  const [price, setPrice] = useState<any>(0);
  const [minHours, setMinHours] = useState<any>(0);
  const [maxHours, setMaxHours] = useState<any>(0);
  const [specificDates, setSpecificDates] = useState<any>([]);
  const steps = 11;
  const navigate = useNavigate();

  useEffect(() => {
    const isUserIn = isLoggedIn();
    if (!isUserIn) {
      return navigate("/");
    }
    setIsLoading(false);
        // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        //   event.preventDefault();
        //   event.returnValue = ""; 
        // };

        // window.addEventListener("beforeunload", handleBeforeUnload);

        // return () => {
        //   window.removeEventListener("beforeunload", handleBeforeUnload);
        // };
  }, []);

  if (isLoading) {
    return <div className="w-full h-screen bg-white"></div>;
  }

  // if (name) console.log("name", name);
  // if (desc) console.log("desc", desc);
  // if (long) console.log("long", long);
  // if (lat) console.log("lat", lat);
  // if (selectedFeatures) console.log("selectedFeatures", selectedFeatures);
  // if (selectedImages) console.log("selectedImages", selectedImages);
  // if (category) console.log("categories", category);
  // if (region) console.log("region", region);
  // if (guests) console.log("guests", guests);
  // if (price) console.log("price", price);
  // if (minHours) console.log("minHours", minHours);
  // if (maxHours) console.log("maxHours", maxHours);
  // if (specificDates) console.log("specificDates", specificDates);



  return (
    <div className="relative w-full min-h-screen flex justify-center items-center px-4 py-[100px] md:px-[80px] lg:px-[120px]  md:pt-[200px] md:pb-10">
      <Link
        to="/"
        className="absolute top-0 left-0 md:top-4 md:left-4 text-white"
      >
        <img src={logo} className="" alt="logo" />
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
