
import React from 'react'
import CaptainOffer from '@/components/inbox/CaptainOffer'
import BoatNameAndPic from '@/components/inbox/BoatNameAndPic'
import Dates from '@/components/inbox/Dates'
import Hours from '@/components/inbox/Hours'
import Duration from '@/components/inbox/Duration'
import Groupe from '@/components/inbox/Groupe'
import WithCaptain from '@/components/inbox/WithCaptain'
import SpecialRequest from '@/components/inbox/SpecialRequest'


const InquiryDetails = ({details}: any) => {
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
