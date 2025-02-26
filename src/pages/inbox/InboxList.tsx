import InboxListCont from "@/containers/inbox/InboxListCont";
import MessagesTrips from "@/containers/inbox/MessagesTrips";
import InboxInquiry from "@/containers/inbox/InboxInquiry";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


const InboxList = () => {
  const { inboxId } = useParams<{ inboxId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });


  return (
    <div className="w-full mt-[73px] flex lg:mt-[93px] lg:pb-0 md:justify-center">
      {inboxId && isMobile ? null : (
        <div className="list w-full pt-5 relative px-3 overflow-auto bg-creme pb-5 z-10 inboxListCss lg:w-[350px] lg:px-2">
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
