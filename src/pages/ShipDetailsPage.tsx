import oneShipJson from "../assets/files/OneShipJson.json"
// import { useParams } from "react-router-dom";
import ShipImagesDescription from "../containers/ShipImagesDescription";
import ShipCheck from "../containers/ShipCheck";
import {useState, useEffect} from "react";
import LoadingLine from "@/components/ui/LoadingLine";



const ShipDetailsPage = () => {

  // const { boatId } = useParams<{ boatId: string }>();
  const [shipDetails, setShipDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setShipDetails(oneShipJson);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }
  

  return (
    <div className="w-full mt-[90px] pb-10 px-4 flex flex-col items-center md:px-20 lg:mt-[130px] lg:px-[100px] 2xl:px-[220px]">
      <ShipImagesDescription ship={shipDetails} />
      <hr className="my-5 lg:my-18" />
      <ShipCheck ship={shipDetails} />
    </div>
  );
}

export default ShipDetailsPage
