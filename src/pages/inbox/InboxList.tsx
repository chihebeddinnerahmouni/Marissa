import InboxListCont from "@/containers/inbox/InboxListCont";
import MessagesTrips from "@/containers/inbox/MessagesTrips";
import InboxInquiry from "@/containers/inbox/InboxInquiry";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import isLoggedIn from "@/lib/isLogedin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const InboxList = () => {
  const { inboxId } = useParams<{ inboxId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  // const isMobile = useMediaQuery({ query: "(max-width: 648px)" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/page=1");
    }
  }, []);

  return (
    <div className="w-full mt-[73px] flex lg:mt-[93px] lg:pb-0 md:justify-center">
      {inboxId && isMobile ? null : (
        <div
          className="list w-full pt-5 relative lg:w-[350px] px-3 overflow-auto bg-creme pb-5 z-10 lg:px-2 inboxListCss md:w-[550px]"
        >
          <InboxListCont />
        </div>
      )}

      {inboxId ? (
        isMobile ? (
          <InboxInquiry />
        ) : (
          <InboxInquiry />
        )
      ) : isMobile ? null : (
        <MessagesTrips />
      )}
    </div>
  );
};

export default InboxList;
