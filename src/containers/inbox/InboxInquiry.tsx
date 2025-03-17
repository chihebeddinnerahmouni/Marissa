import Top from "@/components/inbox/Top"
import { useState, useEffect } from "react"
import InquiryDetails from "./InquiryDetails"
import InquiryMessages from "./InquiryMessages"
import LoadingLine from "@/components/ui/LoadingLine"
import { useParams } from "react-router-dom"
import { db } from "../../../firebaseConfig"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'


const InboxInquiry = () => {

  const [selected, setSelected] = useState('details');
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const { inboxId } = useParams<{ inboxId: string }>();
  const userId = useSelector((state: RootState) => state.user.user.id);
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
    
    if (userId) fetchConversations();
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
      className={`relative flex-grow flex flex-col items-center inboxListCss overflow-aut pb10 mdpx-10 lg:px-0 bg-creme`}
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

