import Top from "@/components/inbox/Top"
import { useState, useEffect } from "react"
import InquiryDetails from "./InquiryDetails"
import InquiryMessages from "./InquiryMessages"
import LoadingLine from "@/components/ui/LoadingLine"
import { useParams } from "react-router-dom"
import { db } from "../../../firebaseConfig"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import {useNavigate} from 'react-router-dom'


const InboxInquiry = () => {

  const [selected, setSelected] = useState('details');
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const { inboxId } = useParams<{ inboxId: string }>();
  const userId = Number(localStorage.getItem("userId"));
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchConversations = async () => {
      const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", userId)
      );
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const fetchedConversations = snapshot.docs
          .map((doc) => ({
            conversationId: doc.id,
            ...doc.data(),
            otherParticipantName: doc
              .data()
              .participants.find((id: string) => Number(id) !== userId),
            listing_id: doc.data().listing_id, 
          }))
          .filter((conversation) => conversation.conversationId === inboxId);

        setDetails(fetchedConversations);
        if (fetchedConversations.length === 0) {
          navigate("/404");
          return;
        }
        setLoading(false);
      });
      return () => unsubscribe();
    };
    fetchConversations();
  }, [userId, inboxId]);

  // console.log('details', details)

  if (loading) {
    return (
      <div className="flex-grow h-screen">
        <LoadingLine />
      </div>
    )
  }


  return (
    <div
      className={`flex-grow flex flex-col items-center pb-10 md:px-10 md:pb-[40px] inboxList lg:pb-[75px] bg-creme overflow-auto`}
    >
      <Top selected={selected} setSelected={setSelected} details={details[0]} />
      {selected === "details" && (
        <InquiryDetails details={details} setSelected={setSelected} />
      )}
      {selected === "messages" && <InquiryMessages details={details} />}
    </div>
  );
}

export default InboxInquiry
