import CaptainOffer from '@/components/inbox/CaptainOffer'
import BoatNameAndPic from '@/components/inbox/BoatNameAndPic'
import Dates from '@/components/inbox/Dates'
import Hours from '@/components/inbox/Hours'
import Duration from '@/components/inbox/Duration'
import Groupe from '@/components/inbox/Groupe'
import WithCaptain from '@/components/inbox/WithCaptain'
import SpecialRequest from '@/components/inbox/SpecialRequest'
import inbox_details from '@/assets/files/inbox_details'
import { useState, useEffect } from 'react'
import LoadingLine from '@/components/ui/LoadingLine'
import { useParams } from 'react-router-dom'




const InquiryDetails = () => {

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { inboxId } = useParams<{ inboxId: string }>();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => { 
      // const inboxIdNumber = Number(inboxId);
    setDetails(inbox_details);
    setLoading(false);
    }, 1000);
  }, [inboxId]);

  if (loading) {
        return (
    <div className="w-full h-screen">
      <LoadingLine />
  </div>
    )
  }





  return (
    <div className="content w-full px-4 md:w-[550px] xl:w-[650px]">
      <CaptainOffer details={details} />
      <BoatNameAndPic details={details} />
      <Dates details={details} />
      <Hours details={details} />
      <Duration details={details} />
      <Groupe details={details} />
      <WithCaptain />
      <SpecialRequest details={details} />
    </div>
  );
}

export default InquiryDetails
