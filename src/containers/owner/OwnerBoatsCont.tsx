import LoadingLine from "@/components/ui/LoadingLine";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OneBoatComp from "@/components/owner/OneBoatComp";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

const fetchBoats = async () => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const res = await axios.get(`${url}/api/listing/owner/my-listings`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return res.data;
};

const OwnerBoatsCont = () => {
  const navigate = useNavigate();
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1046px)" });
  const { t } = useTranslation();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["getMyBoatsCont"],
    queryFn: fetchBoats,
  });

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: t("ops"),
        text: t("something_went_wrong"),
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      if (!myBoatId && !isMobile) {
        navigate(`/my-boats/${data.listings[0].id}`);
        return;
      }
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="items w-full flex flex-col gap-4 h-12 inboxListCss lg:w-[350px]">
        <LoadingLine />
      </div>
    );
  }

  return (
    <div className="w-full px-3 overflow-auto z-10 pb-5 inboxListCss md:px-20 lg:w-[350px] lg:px-2">
        <p className="my-4 self-start">
          {t("you_have")}: {data.listings.length} {t("boats")}
        </p>
      <div className="items w-full flex flex-col gap-4 items-center">
        {data.listings.map((inboxItem: any, index: number) => (
          <OneBoatComp key={index} item={inboxItem} />
        ))}
      </div>
    </div>
  );
};

export default OwnerBoatsCont;

