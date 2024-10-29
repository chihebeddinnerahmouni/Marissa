import ShipDetails from "../components/ui/ShipDetails";
import { useEffect, useState } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import axios from "axios";




const Ships = ({ selectedType, currentPage }: any) => {


  const [shipsArray, setShipsArray] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const limit = 10;




  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}/api/listing/listings?page=${1}&limit=${limit}&categoryId=${selectedType}`)
      .then((response) => {
        setShipsArray(response.data.listings);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedType, currentPage]);

  






  if (loading) return (
   <div className="w-full h-screen">
      <LoadingLine />
   </div>
    )


  return (
    <div className="w-full mt-[65px] flex justify-center items-center">
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-16 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-16 lg:gap-x-4 2xl:grid-cols-4">
        {shipsArray.map((ship: any, index: number) => (
          <ShipDetails key={index} ship={ship} />
        ))}
      </div>
    </div>
  );
};

export default Ships
