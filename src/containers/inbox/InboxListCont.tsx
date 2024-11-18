import InboxItem from "@/components/ui/InboxItem";
import LoadingLine from "@/components/ui/LoadingLine";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Filter from "@/components/inbox/Filter";
import options from "@/assets/files/inbox/filter_categories";

const InboxListCont = () => {
  const [loading, setLoading] = useState(true);
  const [originalConversations, setOriginalConversations] = useState<any>([]);
  const [filteredConversations, setFilteredConversations] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(options[0]);
  const navigate = useNavigate();
  const { inboxId } = useParams<{ inboxId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  const userId = Number(localStorage.getItem("userId"));
  // const isBoatOwner = localStorage.getItem("isBoatOwner");

  useEffect(() => {
    const fetchConversations = async () => {
      const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", userId)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let fetchedConversations = snapshot.docs.map((doc) => ({
          conversationId: doc.id,
          ...doc.data(),
          otherParticipantName: doc
            .data()
            .participants.find((id: string) => Number(id) !== userId),
        })) as any;

        //  if (isBoatOwner) {
        //    fetchedConversations = fetchedConversations.filter(
        //      (conversation: any) => conversation.boatOwnerDetails?.id === userId
        //    );
        //  } else {
        //     fetchedConversations = fetchedConversations.filter(
        //       (conversation: any) => conversation.clientDetails?.id === userId
        //     );
        //  }

        setOriginalConversations(fetchedConversations);
        setFilteredConversations(fetchedConversations);
        setLoading(false);
        if (!inboxId && !isMobile) {
          navigate(`/inbox/${fetchedConversations[0].conversationId}`);
          setLoading(false);
          return;
        }
      });
      return () => unsubscribe();
    };

    fetchConversations();
  }, [userId]);

  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredConversations(originalConversations);
      return;
    }

    const newArray = originalConversations.filter(
      (conv: any) => conv.status === selectedFilter
    );
    setFilteredConversations(newArray);
  }, [selectedFilter, originalConversations]);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <>
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="items w-full mt-5 flex flex-col gap-4 ">
        {filteredConversations.map((inboxItem: any, index: number) => (
          <InboxItem key={index} item={inboxItem} />
        ))}
      </div>
    </>
  );
};

export default InboxListCont;