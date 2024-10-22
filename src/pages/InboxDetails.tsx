import Filter from "@/components/inbox/Filter"
import inboxListArray from "@/assets/files/InboxList"
import InboxListCont from "@/containers/InboxListCont"
import InboxInquiry from "@/containers/InboxInquiry"
import inbox_details from "@/assets/files/inbox_details"


const InboxDetails = () => {
  return (
    <div className="w-full mt-[75px] flex pb-5 lg:mt-[95px] lg:pb-0">
      <div
        className="list hidden bg-white w-full pt-5 px-3 pb-5 overflow-auto md:px-2 md:w-[350px] lg:absolute lg:block inboxList"
      >
        <Filter />
        <InboxListCont inboxListArray={inboxListArray} />
      </div>
          <InboxInquiry details={inbox_details} />
    </div>
  );
}

export default InboxDetails
