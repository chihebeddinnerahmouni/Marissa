import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";


const ButtomMessages = ({
  details,
  user
}: {
    details: any;
  user: any;
  }) => {
  
  
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState("");


  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !details[0]) return;
    setNewMessage("");
    await addDoc(
      collection(db, "conversations", details[0].conversationId, "messages"),
      {
        senderId: user.id,
        senderName: user.name + " " + user.surname,
        message: newMessage,
        timestamp: serverTimestamp(),
      }
    );
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full absolute px-4 h-[60px] bg-creme shadow-hoverShadow bottom-0 py-2 lg:h-[70px] flex justify-center items-center gap-2">
      <input
        type="text"
        placeholder={t("message")}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="relative w-full h-full px-3 rounded-10 bg-emptyInput border-1 border-main text-writingMainDark font-medium outline-main md:w-[500px] xl:w-[600px]"
      />
      <button
        className="w-[70px] h-full bg-main text-white rounded-10 hover:bg-mainHover"
        onClick={handleSendMessage}
      >
        {t("send")}
      </button>
    </div>
  );
};

export default ButtomMessages;

