import { MdNotificationsActive } from "react-icons/md";
import CongratsModal from "@/components/notifs/CongratsModal.tsx";
import UserNotifs from "@/components/notifs/UserNotifs.tsx";
import { useEffect, useState } from 'react'
import { db } from "../../../firebaseConfig";
import {
  collection,
  limit,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import isLoggedIn from "@/lib/isLogedin.ts";

const Bounce = () => {

      const userId = Number(localStorage.getItem("userId")); // assuming you have userId stored in localStorage
      const [conversations, setConversations] = useState<any[]>([]); // conversation details
      const [lastMessageTimestamps, setLastMessageTimestamps] = useState<{
        [key: string]: number;
      }>({});
      const [isCongratsOpen, setIsCongratsOpen] = useState(false);
      const [userNotifs, setUserNotifs] = useState<any[]>([]);
      const [isUserNotifsOpen, setIsUserNotifsOpen] = useState(false);
      const [bounce, setBounce] = useState(false);
      const navigate = useNavigate();
      const location = useLocation();
      const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;

      useEffect(() => {
        const fetchConversations = async () => {
          const q = query(
            collection(db, "conversations"),
            where("participants", "array-contains", userId)
          );
          const unsubscribe = onSnapshot(q, async (snapshot) => {
            const fetchedConversations = snapshot.docs.map((doc) => ({
              conversationId: doc.id,
              ...doc.data(),
              otherParticipantName: doc
                .data()
                .participants.find((id: string) => Number(id) !== userId),
            })) as any;

            // Fetch the latest message timestamp for each conversation
            const timestamps: { [key: string]: number } = {};
            await Promise.all(
              fetchedConversations.map(async (conversation: any) => {
                const messagesQuery = query(
                  collection(
                    db,
                    "conversations",
                    conversation.conversationId,
                    "messages"
                  ),
                  orderBy("timestamp", "desc"),
                  limit(1)
                );
                const messagesSnapshot = await getDocs(messagesQuery);
                if (!messagesSnapshot.empty) {
                  const latestMessage = messagesSnapshot.docs[0].data();
                  timestamps[conversation.conversationId] =
                    latestMessage.timestamp.toMillis();
                }
              })
            );

            setLastMessageTimestamps(timestamps);
            setConversations(fetchedConversations);
          });

          return () => unsubscribe();
        };

        const checkNotifs = async () => {
          axios
            .get(urlListing + "/api/bookings/inquiries/user-inquiries", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            })
            .then((res) => {
              // console.log(res.data);
              // if (!res.data.isClient && res.data.boatOwnerInquiries.length > 0) {
              //   setIsCongratsOpen(true);
              //   setBounce(true);
              //   setUserNotifs(res.data.boatOwnerInquiries);
              // } else if (res.data.isClient && res.data.clientInquiries.length > 0) {
              //   setIsCongratsOpen(true);
              //   setBounce(true);
              //   setUserNotifs(res.data.clientInquiries);
              // }
              if (
                res.data.boatOwnerInquiries &&
                res.data.boatOwnerInquiries.length > 0
              ) {
                //  console.log("1");
                setIsCongratsOpen(true);
                setBounce(true);
                setUserNotifs(res.data.boatOwnerInquiries);
              }
              if (
                res.data.clientInquiries &&
                res.data.clientInquiries.length > 0
              ) {
                // console.log("2");
                setIsCongratsOpen(true);
                setBounce(true);
                setUserNotifs(res.data.clientInquiries);
              }
            })
            .catch(() => {});
        };

        if (isLoggedIn()) {
          fetchConversations();
          checkNotifs();
        }

        // setUserNotifs(data.boatOwnerInquiries)
      }, [userId]);
    
    useEffect(() => {
      const unsubscribeList = conversations.map((conversation) => {
        const q = query(
          collection(
            db,
            "conversations",
            conversation.conversationId,
            "messages"
          ),
          orderBy("timestamp", "asc")
        );
        return onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const newMessage = snapshot.docs[snapshot.docs.length - 1].data();
            const newMessageTimestamp = newMessage.timestamp?.toMillis();

            if (
              newMessageTimestamp &&
              (!lastMessageTimestamps[conversation.conversationId] ||
                newMessageTimestamp >
                  lastMessageTimestamps[conversation.conversationId]) &&
              newMessage.senderId !== userId
            ) {
              if (!location.pathname.includes("/inbox")) {
                toastFunc(conversation.conversationId, newMessage.message);
                // console.log(newMessage);
              }
              setLastMessageTimestamps((prev) => ({
                ...prev,
                [conversation.conversationId]: newMessageTimestamp,
              }));
            }
          }
        });
      });

      return () => {
        unsubscribeList.forEach((unsubscribe) => unsubscribe());
      };
    }, [conversations, lastMessageTimestamps, userId]);

    const toastFunc = (id: number, newMessage: string) => {
      toast.info(newMessage, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#f8f8f8",
          color: "main",
          fontSize: "16px",
        },
        className: "custom-toast",
        onClick: () => {
          navigate("/inbox/" + id);
        },
      });
    };

  return (
    <>
      {bounce && (
        <div
          className="notifs fixed bottom-10 right-7 w-[50px] h-[50px] rounded-full bg-red-500 flex items-center justify-center shadow-lg animate-bounce lg:right-9 lg:bottom-14"
          onClick={() => setIsCongratsOpen(true)}
        >
          <button className="w-full h-full flex items-center justify-center">
            <MdNotificationsActive className="text-white text-2xl" />
          </button>
        </div>
      )}
      {isCongratsOpen && (
        <CongratsModal
          setIsCongratsOpen={setIsCongratsOpen}
          setIsUserNotifsOpen={setIsUserNotifsOpen}
        />
      )}
      {isUserNotifsOpen && (
        <UserNotifs
          setIsCongratsOpen={setIsUserNotifsOpen}
          userNotifs={userNotifs}
        />
      )}
    </>
  );
};

export default Bounce;
