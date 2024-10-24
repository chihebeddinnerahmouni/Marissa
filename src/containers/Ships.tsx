import ShipDetails from "../components/ui/ShipDetails";
import ships_array from "../assets/files/ShipsList";
import { useEffect, useState } from "react";
import LoadingLine from "@/components/ui/LoadingLine";




const Ships = ({ selectedType, currentPage }: any) => {


  const [shipsArray, setShipsArray] = useState<any>({});
  const [loading, setLoading] = useState(true);


    
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setShipsArray(ships_array);
      setLoading(false);
    }, 1000); 
  }, [selectedType]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setShipsArray(ships_array);
      setLoading(false);
    }, 1000); 
  }, [currentPage]);




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
