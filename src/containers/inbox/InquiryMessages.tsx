import { useState, useEffect, useRef, useContext } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import { db } from "../../../firebaseConfig";
import ButtomMessages from "@/components/inbox/ButtomMessages";
import {
  orderBy,
  collection,
  query,
  // where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";



const InquiryMessages = ({ details, ownerPic }: any) => {
  
  const profilePic = useSelector((state: RootState) => state.user.user.profilePicture);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = Number(localStorage.getItem("userId"));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const url = import.meta.env.VITE_SERVER_URL_USERS;

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(
        db,
        "conversations",
        details[0].conversationId,
        "messages"
      ),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => doc.data() as any);
      setMessages(fetchedMessages);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [details[0]]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !details[0]) return;
    setNewMessage("");
    await addDoc(
      collection(
        db,
        "conversations",
        details[0].conversationId,
        "messages"
      ),
      {
        senderId: userId,
         senderName: localStorage.getItem("userName"),
        message: newMessage,
        timestamp: serverTimestamp(),
      }
    );
  };

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <>
      <div className="content w-full px-4 mt-[85px] md:w-[550px] lg:mt-[90px] xl:w-[650px] messagesContCss bg-creme">
        <div className="flex flex-col space-y-5 lg:space-y-8">
          {messages.map((message: any, index: number) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <img
                  src={
                    message.senderId === userId
                      ? profilePic
                        ? `${url}/${profilePic}`
                        : "/anonyme.jpg"
                      : ownerPic
                      ? `${url}/${ownerPic}`
                      : "/anonyme.jpg"
                  }
                  className="w-8 h-8 rounded-full bg-gray-300 object-cover object-center lg:h-10 lg:w-10"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm lg:text-base">
                    {message.senderId === userId
                      ? localStorage.getItem("userName")
                      : message.senderName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp ? (
                      <>
                        {new Date(
                          message.timestamp.toDate()
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        {new Date(
                          message.timestamp.toDate()
                        ).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: undefined,
                        })}
                      </>
                    ) : (
                      "Loading..."
                    )}
                  </span>
                </div>
              </div>
              <div className="bg-[#ebebeb] p-2 rounded-md lg:text-[18px]">
                <span>{message.message}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ButtomMessages
        onClick={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </>
  );
};

export default InquiryMessages;