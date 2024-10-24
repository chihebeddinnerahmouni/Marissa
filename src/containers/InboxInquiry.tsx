import Top from "@/components/inbox/Top"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import InquiryDetails from "./InquiryDetails"
import InquiryMessages from "./InquiryMessages"
import ButtomTrip from "@/components/inbox/ButtomTrip"
import ButtomMessages from "@/components/inbox/ButtomMessages"


const InboxInquiry = () => {
  
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState('details');


  return (
    // <div className={`flex-grow flex flex-col items-center overflow-auto pb-20 md:px-10 inboxList lg:pb-[100px] ${i18n.language === 'en' ? 'lg:ml-[350px]' : 'lg:mr-[350px]'}`}>
    <div className={`flex-grow flex flex-col items-center overflow-auto pb-20 md:px-10 inboxList lg:pb-[100px] ${i18n.language === 'en' ? 'lg:ml-[0px]' : 'lg:mr-[0px]'}`}>
      <Top selected={selected} setSelected={setSelected} />
      {selected === 'details' && <InquiryDetails />}
      {selected === 'details' && <ButtomTrip/>}
      {selected === 'messages' && <InquiryMessages />}
      {selected === 'messages' && <ButtomMessages />}
      
    </div>
  );
}

export default InboxInquiry
