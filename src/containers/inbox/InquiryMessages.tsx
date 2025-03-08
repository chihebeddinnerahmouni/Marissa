import { useState, useEffect, useRef } from "react";
import LoadingLine from "@/components/ui/LoadingLine";
import { db } from "../../../firebaseConfig";
import ButtomMessages from "@/components/inbox/ButtomMessages";
import {
  orderBy,
  collection,
  query,
  onSnapshot,
  // addDoc,
  // serverTimestamp,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslation } from "react-i18next"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



const InquiryMessages = ({ details, ownerPic }: any) => {
  
  const user = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any>([]);
  // const [newMessage, setNewMessage] = useState("");
  // const messagesEndRef = useRef<HTMLDivElement>(null);
  const url = import.meta.env.VITE_SERVER_URL_USERS;
  const messagesContRef = useRef<HTMLDivElement>(null);

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
     if (messagesContRef.current) {
       messagesContRef.current.scrollTop =
         messagesContRef.current.scrollHeight;
     }
  }, []);

  // const handleSendMessage = useCallback(async () => {
  //   if (newMessage.trim() === "" || !details[0]) return;
  //   setNewMessage("");
  //   await addDoc(
  //     collection(
  //       db,
  //       "conversations",
  //       details[0].conversationId,
  //       "messages"
  //     ),
  //     {
  //       senderId: user.id,
  //       senderName: user.name + " " + user.surname,
  //       message: newMessage,
  //       timestamp: serverTimestamp(),
  //     }
  //   );
  // }, [newMessage, details, user]);
  

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <>
      <div className="w-full px4 overflow-auto mt-[70px] messagesContCss">
        <div
          ref={messagesContRef}
          className="content flex flex-col space-y-5 w-full mx-auto p-4 md:px-0 md:w-[550px] lg:space-y-8 xl:w-[650px]"
        >
          {messages.map((message: any, index: number) => (
            <MessageComp
              key={index}
              message={message}
              user={user}
              ownerPic={ownerPic}
              url={url}
              isLastMessage={index === messages.length - 1}
              // ref={index === messages.length - 1 ? messagesEndRef : null}
            />
          ))}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </div>

      <ButtomMessages
        details={details}
        user={user}
      />
    </>
  );
};

export default InquiryMessages;


const MessageComp = ({
  message,
  user,
  ownerPic,
  url,
  isLastMessage,
  // ref
}: {
  message: any;
  user: any;
  ownerPic: string;
  url: string;
  // ref: any;
  isLastMessage: boolean;
  }) => {
  
  const date = message.timestamp && new Date(message.timestamp.seconds * 1000);
  const { i18n, t } = useTranslation();
  const locale = i18n.language === "ar" ? "ar" : "en-GB";

  const profilePicture =
    message.senderId === user.id
      ? user.profilePicture
        ? `${url}/${user.profilePicture}`
        : "/anonyme.jpg"
      : ownerPic
      ? `${url}/${ownerPic}`
        : "/anonyme.jpg";
  

  return (
    <div
      className={`flex flex-col space-y-2 ${isLastMessage && "bg-green-200"}`}
      // ref={isLastMessage ? ref : null}
    >
      <div className="flex items-center gap-2">
        <LazyLoadImage
          src={profilePicture}
          alt="profile picture"
          effect="blur"
          className="w-8 h-8 rounded-full bg-gray-300 object-cover object-center lg:h-10 lg:w-10"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm lg:text-base">
            {message.senderId === user.id
              ? user.name + " " + user.surname
              : message.senderName}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp ? (
              <>
                {date.toLocaleDateString(locale, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                {date.toLocaleTimeString(locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: undefined,
                })}
              </>
            ) : (
              t("loading") + "..."
            )}
          </span>
        </div>
      </div>
      <div className="bg-[#ebebeb] p-2 rounded-md lg:text-[18px]">
        <span>{message.message}</span>
      </div>
    </div>
  );
};