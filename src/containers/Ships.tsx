import ShipDetails from "../components/ui/ShipDetails";
import { useEffect, useState } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import axios from "axios";
import Pagination from "@/components/ui/Pagination";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
// import shipe_array from '../assets/files/ShipsList'


const Ships = ({ selectedType }: any) => {

  const [shipsArray, setShipsArray] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const limit = 10;
  const query = new URLSearchParams(location.search);
  const page = query.get("page");


  const fetshData = () => {
    axios.get(
          `${url}/api/listing/listings?page=${currentPage}&limit=${limit}&categoryId=${selectedType}`
        )
        .then((response) => {
          // console.log(response.data.listings);
          setShipsArray(response.data.listings);
          setLoading(false);
        })
        .catch((error) => {
          if (error.message === "Network Error")
            // setLoading(false),
              Swal.fire({
                icon: "error",
                title: t("network_error"),
                text: t("please_try_again"),
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });
          else {
            // setLoading(false),
              Swal.fire({
                icon: "error",
                title: "Error",
                text: t("please_try_again"),
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });
        }
        });
  }
  
  useEffect(() => {
    if (!page) {
      return navigate(`?page=${currentPage}`, { replace: true });
    } else if (Number(page) > totalPages || Number(page) < 1) {
      navigate(`?page=1`, { replace: true });
    } else {
      setCurrentPage(Number(page));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetshData();
  }, [selectedType, page]);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage]);






  if (loading)
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );

  return (
    <>
      <div className="w-full mt-[65px] flex justify-center items-center">
        <div className="w-full grid grid-cols-1 justify-items-center gap-y-16 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-16 lg:gap-x-4 2xl:grid-cols-4">
          {shipsArray.map((ship: any, index: number) => (
            <ShipDetails key={index} ship={ship} />
          ))}
        </div>
      </div>
      <div className="pagination w-full mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Ships
