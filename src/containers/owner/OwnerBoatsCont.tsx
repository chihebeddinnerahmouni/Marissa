import inbox_list_array from "@/assets/files/InboxList";
import LoadingLine from "@/components/ui/LoadingLine";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OneBoatComp from "@/components/owner/OneBoatComp";
import axios from "axios";


const OwnerBoatsCont = () => {

    const [loading, setLoading] = useState(true);
    const [inboxListArray, setInboxListArray] = useState<any>([]);
    const navigate = useNavigate();
    const { myBoatId } = useParams<{ myBoatId: string }>(); 

  useEffect(() => {
    // setTimeout(() => {
    //   setInboxListArray(inbox_list_array);
    //   if (!myBoatId) {
    //     navigate(`/my-boats/${inbox_list_array[0].id}`);
    //     setLoading(false);
    //     return;
    //   }
    //   setLoading(false);
    // }, 1000);
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    axios.get(`${url}/api/listing/owner/my-listings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => { 
        console.log(err);
      });
      
  }, []);

     if (loading) {
       return (
         <div className="w-full h-screen">
           <LoadingLine />
         </div>
       );
     }

  return (
    <div className="items w-full mt-5 flex flex-col gap-4 bg-[#ffffff]">
      {inboxListArray.map((inboxItem: any, index: number) => (
        <OneBoatComp key={index} item={inboxItem} />
      ))}
    </div>
  );
};

export default OwnerBoatsCont;
