import InboxItem from "@/components/ui/InboxItem";


const InboxListCont = ({inboxListArray}: any) => {
  return (
    <div className="items w-full mt-8 flex flex-col gap-4 bg-[#ffffff]">
      {inboxListArray.map((inboxItem: any, index: number) => (
        <InboxItem key={index} item={inboxItem} />
      ))}
    </div>
  );
}

export default InboxListCont
