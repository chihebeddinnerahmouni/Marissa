import Filter from "@/components/inbox/Filter"
import inboxListArray from "@/assets/files/InboxList"
import InboxListCont from "@/containers/InboxListCont"
import MessagesTrips from "@/containers/MessagesTrips"


const InboxList = () => {
  return (
    <div className="w-full mt-[75px] flex pb-5 lg:mt-[95px] lg:pb-0">
      <div
        className="list w-full pt-5 md:w-[350px] px-3 overflow-auto md:px-2"
        style={{ height: "calc(100vh - 95px)" }}
      >
        <Filter />
        <InboxListCont inboxListArray={inboxListArray} />
      </div>
      <MessagesTrips />
    </div>
  );
}

export default InboxList
