import oneShipJson from "../assets/files/OneShipJson.json"
// import { useParams } from "react-router-dom";
import ShipImagesDescription from "../containers/ShipImagesDescription";
import ShipCheck from "../containers/ShipCheck";




const ShipDetailsPage = () => {

    // const { id } = useParams<{ id: string }>();
  

  return (
    <div className="w-full mt-[90px] pb-10 px-4 flex flex-col items-center md:px-20 lg:mt-[130px] lg:px-[100px] 2xl:px-[220px]">
      <ShipImagesDescription ship={oneShipJson} />
      <hr className="my-5 lg:my-18" />
      <ShipCheck ship={oneShipJson} />
    </div>
  );
}

export default ShipDetailsPage
