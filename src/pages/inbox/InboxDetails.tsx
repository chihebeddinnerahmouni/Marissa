import Filter from "@/components/inbox/Filter"
import InboxListCont from "@/containers/InboxListCont"
import InboxInquiry from "@/containers/InboxInquiry"


const InboxDetails = () => {



  return (
    <div className="w-full mt-[75px] flex pb-5 lg:mt-[95px] lg:pb-0">
      <div
        className="list hidden bg-white w-full pt-5 px-3 overflow-auto md:px-2 md:w-[350px] lg:absolute lg:block inboxList z-10"
      >
        <Filter />
        <InboxListCont />
      </div>
          <InboxInquiry />
    </div>
  );
}

export default InboxDetails
