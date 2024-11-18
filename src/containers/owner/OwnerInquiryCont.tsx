import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import OwnerInquiryDetails from "./OwnerInquiryDetails";
// import Top from "@/components/inbox/Top";
import OwnerMessagesCont from "./OwnerMessagesCont";


const OwnerInquiryCont = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState("details");
  // const selected = "details";

  useEffect(() => {
    setSelected("details");
  }, []);

  return (
    // <div className={`flex-grow flex flex-col items-center overflow-auto pb-20 md:px-10 inboxList lg:pb-[100px] ${i18n.language === 'en' ? 'lg:ml-[350px]' : 'lg:mr-[350px]'}`}>
    <div
      className={`flex-grow flex flex-col items-center overflow-auto pb-20 md:px-10 lg:pb-[100px] ${
        i18n.language === "en" ? "lg:ml-[0px]" : "lg:mr-[0px]"
        }`}
      style={{ maxHeight: "calc(100vh - 95px)" }}
    >
          {/* <Top selected={selected} setSelected={setSelected} /> */}
          {selected === "details" && <OwnerInquiryDetails />}
      {selected === "messages" && <OwnerMessagesCont />}
    </div>
  );
};
export default OwnerInquiryCont;
