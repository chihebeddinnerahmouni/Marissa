

const BoatNameAndPic = ({details}: any) => {
  return (
    <div className="w-full p-2 bg-white mt-5 rounded-10 shadow-hoverShadow flex items-start gap-4">
      <img
        src={details.boatPic}
        className="w-[130px] h-[90px] object-cover object-center rounded-10"
              alt="profile"
      />

      <p className="text-[18px]">
        {details.boatName}
      </p>
    </div>
  );
}

export default BoatNameAndPic
