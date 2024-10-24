import Filter from "@/components/inbox/Filter"
import InboxListCont from "@/containers/InboxListCont"
import MessagesTrips from "@/containers/MessagesTrips"
import InboxInquiry from "@/containers/InboxInquiry"
import { useParams } from "react-router-dom"


const InboxList = () => {

  const { inboxId } = useParams<{ inboxId: string }>()

  return (
    <div className="w-full mt-[75px] flex pb-5 lg:mt-[95px] lg:pb-0">
      <div
        className="list w-full bg-white pt-5 md:w-[350px] px-3 overflow-auto pb-5 z-10 md:px-2 "
        style={{ height: "calc(100vh - 95px)" }}
      >
        <Filter />
        <InboxListCont />
      </div>
      {/* <MessagesTrips /> */}
      {inboxId ? <InboxInquiry /> : <MessagesTrips />}
    </div>
  );
}

export default InboxList
