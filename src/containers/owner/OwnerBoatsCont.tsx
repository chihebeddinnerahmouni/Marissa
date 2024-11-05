import { useState, useEffect } from "react"
import LoadingLine from "@/components/ui/LoadingLine";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const OwnerBoatsCont = () => {

  const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //   setTimeout(() => {
    //     setInboxListArray(inbox_list_array);
    //     if (!inboxId) {
    //       navigate(`/inbox/${inbox_list_array[0].id}`);
    //       setLoading(false);
    //       return;
    //     }
    //     setLoading(false);
    //   }, 1000);
    // }, []);
  
  return (
    <div>
      
    </div>
  )
}

export default OwnerBoatsCont
