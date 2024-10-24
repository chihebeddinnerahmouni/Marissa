import InboxItem from "@/components/ui/InboxItem";
import inbox_list_array from "@/assets/files/InboxList";
import LoadingLine from "@/components/ui/LoadingLine";
import {useState, useEffect} from "react";


const InboxListCont = () => {

  const [loading, setLoading] = useState(true);
  const [inboxListArray, setInboxListArray] = useState<any>([]);

  useEffect(() => {
    setTimeout(() => {
      setInboxListArray(inbox_list_array);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }



  return (
    <div className="items w-full mt-5 flex flex-col gap-4 bg-[#ffffff]">
      {inboxListArray.map((inboxItem: any, index: number) => (
        <InboxItem key={index} item={inboxItem} />
      ))}
    </div>
  );
}

export default InboxListCont
