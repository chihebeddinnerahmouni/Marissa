import Top from "@/components/inbox/Top"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import InquiryDetails from "./InquiryDetails"
import InquiryMessages from "./InquiryMessages"


const InboxInquiry = ({ details }: any) => {
  
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState('messages');


  return (
    <div className={`flex-grow flex flex-col items-center overflow-auto pb-5 md:px-10 inboxList ${i18n.language === 'en' ? 'lg:ml-[350px]' : 'lg:mr-[350px]'}`}>
      <Top selected={selected} setSelected={setSelected} />
      {selected === 'details' && <InquiryDetails details={details} />}
      {selected === 'messages' && <InquiryMessages details={details} />}
    </div>
  );
}

export default InboxInquiry
