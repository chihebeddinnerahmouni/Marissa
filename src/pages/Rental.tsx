import ships_array from "../assets/files/ShipsList";
import ShipsCont from "@/containers/rental/shipsCont";
import Pagination from "@/components/ui/Pagination";
import { useState, useEffect } from "react";
import Top from "@/components/rental/Top";
// import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const Rental = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    // const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const page = query.get("page");
    const when = query.get("when");
    const where = query.get("where");
  const who = query.get("who");
  const capacity = query.get("capacity");
  const minRating = query.get("minRating");
  const maxRating = query.get("maxRating");
  const availability = query.get("availability");
  const minPrice = query.get("minPrice");
  const maxPrice = query.get("maxPrice");



    useEffect(() => {

        if (!page) {
            query.set("page", "1");
            navigate(`${location.pathname}?${query.toString()}`, {
              replace: true,
            });
            return
        }

        const check = !where && !when && !who && !capacity && !minRating && !maxRating && !availability && !minPrice && !maxPrice;
        if (check) {
            console.log("check")
        }


        if (Number(page) > totalPages || Number(page) < 1) {
              query.set("page", "1");
              navigate(`${location.pathname}?${query.toString()}`, {
                replace: true,
              });
            return
        }
        setCurrentPage(Number(page));
    }, []);


    useEffect(() => {
         query.set("page", currentPage.toString());
         navigate(`${location.pathname}?${query.toString()}`, {
           replace: true,
         });
     }, [currentPage]);



  return (
    <div
      className={`content w-full mt-[80px] px-[20px] pb-10 flex flex-col md:px-[80px] md:mt-[90px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px]`}
      >
            <Top />
      <ShipsCont ships_array={ships_array} />
            <div className="pagination w-full mt-10">
              <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </div>
    </div>
  );
}

export default Rental
