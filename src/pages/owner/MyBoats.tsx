import OwnerBoatsCont from "@/containers/owner/OwnerBoatsCont";
import OwnerBoatDetailsCont from "@/containers/owner/OwnerBoatDetailsCont";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const MyBoats = () => {
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (Object.keys(user).length !== 0 && !user.isBoatOwner) {
      navigate("/");
    }
  }, [user]);


  return (
    <div className="w-[100%] mt-[75px] pt-5 flex lg:pb-0 md:justify-start bg-creme">
      {myBoatId && isMobile ? null : (
        <div className="w-full relativ px-3 overflow-auto z-10 inboxListCss md:px-20 lg:w-[350px] lg:px-2">
          <OwnerBoatsCont />
        </div>
      )}
      {myBoatId ? (
        isMobile ? (
          <OwnerBoatDetailsCont />
        ) : (
          <div className="flex-grow inboxListCss overflow-auto">
            <OwnerBoatDetailsCont />
          </div>
        )
      ) : isMobile ? null : null}
    </div>
  );
};

export default MyBoats;
