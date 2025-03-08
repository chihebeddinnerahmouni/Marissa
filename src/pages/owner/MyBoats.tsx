import OwnerBoatsCont from "@/containers/owner/OwnerBoatsCont";
import OwnerBoatDetailsCont from "@/containers/owner/OwnerBoatDetailsCont";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
    <div className="w-[100%] pb-10 mt-[75px] flex md:justify-start bg-creme lg:mt-[95px]">
      {myBoatId && isMobile ? null : <OwnerBoatsCont />}
      {myBoatId ? (
        isMobile ? (
          <OwnerBoatDetailsCont />
        ) : (
            <OwnerBoatDetailsCont />
        )
      ) : isMobile ? null : null}
    </div>
  );
};

export default MyBoats;
