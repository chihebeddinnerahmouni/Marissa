import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerInquiriesListCont from "@/containers/owner/OwnerInquiriesListCont";
import OwnerInquiryCont from "@/containers/owner/OwnerInquiryCont";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// not used

const OwnerInboxPage = () => {
  const { inqueryId } = useParams<{ inqueryId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (Object.keys(user).length !== 0 && !user.isBoatOwner) {
      navigate("/login");
    }
  }, [user]);

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
