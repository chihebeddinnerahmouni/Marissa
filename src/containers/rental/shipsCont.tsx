import ShipDetails from '@/components/ui/ShipDetails'
import ships_array from "../../assets/files/ShipsList";
 import { useLocation } from 'react-router-dom';




// const shipsCont = ({ships_array}: any) => {
const shipsCont = () => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = query.get("page");
  const capacity = query.get("capacity");
  const minRating = query.get("minRating");
  const maxRating = query.get("maxRating");
  const availability = query.get("availability");
  const minPrice = query.get("minPrice");
  const maxPrice = query.get("maxPrice");



  return (
    <div className="w-full mt-[65px] flex justify-center items-center">
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-16 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-16 lg:gap-x-4 2xl:grid-cols-4">
        {ships_array.listings.map((ship: any, index: number) => (
          <ShipDetails key={index} ship={ship} />
        ))}
      </div>
    </div>
  );
}

export default shipsCont
