import InboxItem from "@/components/ui/InboxItem";
import LoadingLine from "@/components/ui/LoadingLine";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Filter from "@/components/inbox/Filter";
import options from "@/assets/files/inbox/filter_categories";
import { useTranslation } from "react-i18next";


const InboxListCont = () => {
  const [loading, setLoading] = useState(true);
  const [originalConversations, setOriginalConversations] = useState<any>([]);
  const [filteredConversations, setFilteredConversations] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(options[0]);
  const navigate = useNavigate();
  const { inboxId } = useParams<{ inboxId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  const userId = Number(localStorage.getItem("userId"));
  const {t} = useTranslation();

  const fetchConversations = useCallback(async () => {
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
  }, [userId, navigate, inboxId, isMobile]);


  useEffect(() => {
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
      <div className="items mx-auto flex flex-col items-center gap-4 max-w-[400px]">
        {filteredConversations.length !== 0 && (
          <Filter
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
        {filteredConversations.length === 0 ? (
          <div className="text-center text-lg">{t("no_inquiries_found")}</div>
        ) : (
          filteredConversations.map((inboxItem: any, index: number) => (
            <InboxItem key={index} item={inboxItem} />
          ))
        )}
      </div>
    </>
  );
};

export default InboxListCont;
