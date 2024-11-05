import OwnerBoatsCont from "@/containers/owner/OwnerBoatsCont";
import OwnerBoatDetailsCont from "@/containers/owner/OwnerBoatDetailsCont";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Owner = () => {
  const { myBoatId } = useParams<{ myBoatId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });

  return (
    <div className="w-full mt-[75px] flex pb-5 lg:mt-[95px] lg:pb-0">
      {myBoatId && isMobile ? null : (
        <div
          className="list w-full bg-white pt-5 md:w-[350px] px-3 overflow-auto pb-5 z-10 md:px-2 "
          style={{ height: "calc(100vh - 95px)" }}
        >
                  {/* <InboxListCont /> */}
            <OwnerBoatsCont />
        </div>
      )}

          {/* {myBoatId ? <InboxInquiry /> : <MessagesTrips />} */}
            {myBoatId ? <OwnerBoatDetailsCont /> : null}
    </div>
  );
};

export default Owner;
