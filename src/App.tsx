import {
  createContext,
  useState, useEffect
} from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar.tsx";
import { db } from "../firebaseConfig";
import {
  collection,
  limit,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import CongratsModal from "./components/notifs/CongratsModal.tsx";
import axios from "axios";
import UserNotifs from "./components/notifs/UserNotifs.tsx";
import isLoggedIn from "./lib/isLogedin.ts";



export const AppContext = createContext<any>({});

function App() {
  // const [Pcselected, setPcSelected] = useState(""); // selected field on PC navbar
  // const [mobileSelected, setMobileSelected] = useState("where"); // selected field on mobile navbar
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // dropdown menu
  // const [isFormOpen, setIsFormOpen] = useState(false); // form open state
  // const [profilePic, setProfilePic] = useState(""); // user's profile picture
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

    // check if theres notifs
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
          if (res.data.boatOwnerInquiries && res.data.boatOwnerInquiries.length > 0) {
            //  console.log("1");
             setIsCongratsOpen(true);
             setBounce(true);
             setUserNotifs(res.data.boatOwnerInquiries);
          }
          if (res.data.clientInquiries && res.data.clientInquiries.length > 0) {
            // console.log("2");
            setIsCongratsOpen(true);
            setBounce(true);
            setUserNotifs(res.data.clientInquiries);
          }
        })
        .catch(() => {
        });
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

  // console.log(isCongratsOpen);
  return (
    <>
      {/* <AppContext.Provider
        value={{
          Pcselected,
          setPcSelected,
          mobileSelected,
          setMobileSelected,
          isMenuOpen,
          setIsMenuOpen,
          isFormOpen,
          setIsFormOpen,
          profilePic,
          setProfilePic,
        }}
      > */}
        <NavBar />
          <Outlet />
        

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
      {/* </AppContext.Provider> */}
      <ToastContainer />
    </>
  );
}

export default App;

// const data = {
//   "isClient": true,
//   "boatOwnerInquiries": [
//     {
//       "inquiryId": "inquiry_59",
//       "isBoatOwner": true,
//       "data": {
//         "listingDetails": {
//           "id": "93",
//           "image": "uploads\\1731328825690-hirbae.jpg",
//           "name": "chiheb's boat",
//           "description": "boat"
//         },
//         "booking_info": {
//           "tripType": "same day",
//           "duration": {
//             "hours": "1",
//             "minutes": "1"
//           },
//           "preferredDate": "2024-11-20",
//           "departureTime": "12:33",
//           "returnDateTime": {
//             "_seconds": 1732106040,
//             "_nanoseconds": 0
//           },
//           "groupSize": {
//             "adults": "0",
//             "seniors": 1,
//             "children": "1",
//             "infants": "0"
//           },
//           "additionalInfo": "rgtjhghj",
//           "contactDetails": {
//             "name": "fgdghfgh ghfhgfh",
//             "email": "a@a.com",
//             "phone": "9665465453"
//           }
//         },
//         "offer": {
//           "base_cost": 120020,
//           "payment_service_fee": 6001,
//           "total_cost": 126021,
//           "price_per_hour": 1200
//         },
//         "participants": [
//           14,
//           15
//         ],
//         "boatOwnerDetails": {
//           "id": 15,
//           "name": "chiheb",
//           "surname": "rahmouni",
//           "image": "uploads\\avatars\\1731328879163.png"
//         },
//         "clientDetails": {
//           "id": 14,
//           "name": "zakaria",
//           "surname": "amrani",
//           "image": "uploads\\avatars\\1731330486612.png"
//         },
//         "messages": [
//           {
//             "senderId": 14,
//             "message": "Inquiry initiated",
//             "timestamp": {
//               "_seconds": 1731349703,
//               "_nanoseconds": 136000000
//             }
//           }
//         ],
//         "createdAt": {
//           "_seconds": 1731349703,
//           "_nanoseconds": 136000000
//         },
//         "status": "cancelled"
//       }
//     },
//     {
//       "inquiryId": "inquiry_59",
//       "isBoatOwner": true,
//       "data": {
//         "listingDetails": {
//           "id": "93",
//           "image": "uploads\\1731328825690-hirbae.jpg",
//           "name": "chiheb's boat",
//           "description": "boat"
//         },
//         "booking_info": {
//           "tripType": "same day",
//           "duration": {
//             "hours": "1",
//             "minutes": "1"
//           },
//           "preferredDate": "2024-11-20",
//           "departureTime": "12:33",
//           "returnDateTime": {
//             "_seconds": 1732106040,
//             "_nanoseconds": 0
//           },
//           "groupSize": {
//             "adults": "0",
//             "seniors": 1,
//             "children": "1",
//             "infants": "0"
//           },
//           "additionalInfo": "rgtjhghj",
//           "contactDetails": {
//             "name": "fgdghfgh ghfhgfh",
//             "email": "a@a.com",
//             "phone": "9665465453"
//           }
//         },
//         "offer": {
//           "base_cost": 120020,
//           "payment_service_fee": 6001,
//           "total_cost": 126021,
//           "price_per_hour": 1200
//         },
//         "participants": [
//           14,
//           15
//         ],
//         "boatOwnerDetails": {
//           "id": 15,
//           "name": "chiheb",
//           "surname": "rahmouni",
//           "image": "uploads\\avatars\\1731328879163.png"
//         },
//         "clientDetails": {
//           "id": 14,
//           "name": "zakaria",
//           "surname": "amrani",
//           "image": "uploads\\avatars\\1731330486612.png"
//         },
//         "messages": [
//           {
//             "senderId": 14,
//             "message": "Inquiry initiated",
//             "timestamp": {
//               "_seconds": 1731349703,
//               "_nanoseconds": 136000000
//             }
//           }
//         ],
//         "createdAt": {
//           "_seconds": 1731349703,
//           "_nanoseconds": 136000000
//         },
//         "status": "cancelled"
//       }
//     },
//     {
//       "inquiryId": "inquiry_60",
//       "isBoatOwner": true,
//       "data": {
//         "listingDetails": {
//           "id": "94",
//           "image": "uploads\\1731328825690-hirbae.jpg",
//           "name": "another boat",
//           "description": "another boat description"
//         },
//         "booking_info": {
//           "tripType": "same day",
//           "duration": {
//             "hours": "2",
//             "minutes": "30"
//           },
//           "preferredDate": "2024-12-01",
//           "departureTime": "14:00",
//           "returnDateTime": {
//             "_seconds": 1732106040,
//             "_nanoseconds": 0
//           },
//           "groupSize": {
//             "adults": "2",
//             "seniors": 0,
//             "children": "0",
//             "infants": "0"
//           },
//           "additionalInfo": "some additional info",
//           "contactDetails": {
//             "name": "John Doe",
//             "email": "john@example.com",
//             "phone": "1234567890"
//           }
//         },
//         "offer": {
//           "base_cost": 200000,
//           "payment_service_fee": 10000,
//           "total_cost": 210000,
//           "price_per_hour": 8000
//         },
//         "participants": [
//           16,
//           17
//         ],
//         "boatOwnerDetails": {
//           "id": 17,
//           "name": "John",
//           "surname": "Doe",
//           "image": "uploads\\avatars\\1731328879163.png"
//         },
//         "clientDetails": {
//           "id": 16,
//           "name": "Jane",
//           "surname": "Doe",
//           "image": "uploads\\avatars\\1731330486612.png"
//         },
//         "messages": [
//           {
//             "senderId": 16,
//             "message": "Inquiry initiated",
//             "timestamp": {
//               "_seconds": 1731349703,
//               "_nanoseconds": 136000000
//             }
//           }
//         ],
//         "createdAt": {
//           "_seconds": 1731349703,
//           "_nanoseconds": 136000000
//         },
//         "status": "pending"
//       }
//     },
//     {
//       "inquiryId": "inquiry_60",
//       "isBoatOwner": true,
//       "data": {
//         "listingDetails": {
//           "id": "94",
//           "image": "uploads\\1731328825690-hirbae.jpg",
//           "name": "another boat",
//           "description": "another boat description"
//         },
//         "booking_info": {
//           "tripType": "same day",
//           "duration": {
//             "hours": "2",
//             "minutes": "30"
//           },
//           "preferredDate": "2024-12-01",
//           "departureTime": "14:00",
//           "returnDateTime": {
//             "_seconds": 1732106040,
//             "_nanoseconds": 0
//           },
//           "groupSize": {
//             "adults": "2",
//             "seniors": 0,
//             "children": "0",
//             "infants": "0"
//           },
//           "additionalInfo": "some additional info",
//           "contactDetails": {
//             "name": "John Doe",
//             "email": "john@example.com",
//             "phone": "1234567890"
//           }
//         },
//         "offer": {
//           "base_cost": 200000,
//           "payment_service_fee": 10000,
//           "total_cost": 210000,
//           "price_per_hour": 8000
//         },
//         "participants": [
//           16,
//           17
//         ],
//         "boatOwnerDetails": {
//           "id": 17,
//           "name": "John",
//           "surname": "Doe",
//           "image": "uploads\\avatars\\1731328879163.png"
//         },
//         "clientDetails": {
//           "id": 16,
//           "name": "Jane",
//           "surname": "Doe",
//           "image": "uploads\\avatars\\1731330486612.png"
//         },
//         "messages": [
//           {
//             "senderId": 16,
//             "message": "Inquiry initiated",
//             "timestamp": {
//               "_seconds": 1731349703,
//               "_nanoseconds": 136000000
//             }
//           }
//         ],
//         "createdAt": {
//           "_seconds": 1731349703,
//           "_nanoseconds": 136000000
//         },
//         "status": "pending"
//       }
//     }
//   ]
// };