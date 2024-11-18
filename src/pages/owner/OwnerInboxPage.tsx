import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import isLoggedIn from "@/lib/isLogedin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerInquiriesListCont from "@/containers/owner/OwnerInquiriesListCont";
import OwnerInquiryCont from "@/containers/owner/OwnerInquiryCont";


// not used

const OwnerInboxPage = () => {
  const { inqueryId } = useParams<{ inqueryId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
  }, []);

  return (
    <div className="w-full mt-[75px] flex pb-5 lg:mt-[95px] lg:pb-0">
      {inqueryId && isMobile ? null : (
        <div
          className="list w-full bg-white pt-5 md:w-[350px] px-3 overflow-auto pb-5 z-10 md:px-2 "
          style={{ height: "calc(100vh - 95px)" }}
        >
          <OwnerInquiriesListCont />
        </div>
      )}
      {inqueryId ? <OwnerInquiryCont /> : null}
    </div>
  );
};
export default OwnerInboxPage;
