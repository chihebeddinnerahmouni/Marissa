import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import validateEmail from "@/lib/email_regular_exp";

interface ContactUsProps {
  isContactOpen: boolean;
  setIsContactOpen: (value: boolean) => void;
}

const ContactUs: React.FC<ContactUsProps> = ({
  isContactOpen,
  setIsContactOpen,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isEmailMissing, setIsEmailMissing] = useState(false);
  const [isSubjectMissing, setIsSubjectMissing] = useState(false);
    const [isDescriptionMissing, setIsDescriptionMissing] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    
    const send = () => {
        let isMissing = false;
        if (!email) {
            setIsEmailMissing(true);
            isMissing = true;
        }
        if (!subject) {
            setIsSubjectMissing(true);
            isMissing = true;
        }
        if (!description) {
            setIsDescriptionMissing(true);
            isMissing = true;
        }
        if (isMissing) return;

        if (!validateEmail(email)) {
            setIsEmailValid(false);
            return;
        }

    };

  return (
    <ReactModal
      isOpen={isContactOpen}
      onRequestClose={() => setIsContactOpen(false)}
      className="bg-white w-full p-3 rounded-2xl shadow-hardShadow flex flex-col items-center justify-center gap-5 lg:max-w-[700px] lg:p-5"
      overlayClassName="fixed top-0 px-4 left-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center z-20 md:px-10"
    >
      <div className="email w-full">
        <p className="font-semibold text-sm lg:text-base">
          {t("your_email_address")}
        </p>
        <input
          value={email}
          type="email"
          placeholder={t("email")}
          onChange={(e) => {
            setEmail(e.target.value);
              setIsEmailMissing(false);
                setIsEmailValid(true);
          }}
          className={`outline-none mt-1 w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
            isEmailMissing ? "border-red-400" : "border-gray-300"
          } lg:h-12`}
        />

        {isEmailMissing && (
          <p className="text-[10px] mt-2 text-red-400">{t("enter_email")}</p>
        )}
        {!isEmailValid && (
          <p className="text-[10px] mt-2 text-red-400">
            {t("enter_valid_email")}
          </p>
        )}
      </div>

      <div className="subject w-full">
        <p className="font-semibold text-sm lg:text-base">{t("subject")}</p>
        <input
          type="text"
          value={subject}
          placeholder={t("subject")}
          onChange={(e) => {
            setSubject(e.target.value);
            setIsSubjectMissing(false);
          }}
          className={`outline-none mt-1 w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
            isSubjectMissing ? "border-red-400" : "border-gray-300"
          } lg:h-12`}
        />
        {isSubjectMissing && (
          <p className="text-[10px] mt-2 text-red-400">{t("enter_subject")}</p>
        )}
      </div>

      <div className="description w-full">
        <p className="font-semibold text-sm lg:text-base">{t("description")}</p>
        <textarea
          placeholder={t("description")}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setIsDescriptionMissing(false);
          }}
          className={`outline-none mt-1 w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
            isDescriptionMissing ? "border-red-400" : "border-gray-300"
          } lg:h-20`}
        />
        {isDescriptionMissing && (
          <p className="text-[10px] text-red-400">{t("enter_description")}</p>
        )}
      </div>

      <button
        className="w-full h-10 bg-main text-white rounded-[5px] mt-3 hover:bg-mainHover transition-all duration-100"
        onClick={send}
      >
        {t("send")}
      </button>
    </ReactModal>
  );
};

export default ContactUs;
