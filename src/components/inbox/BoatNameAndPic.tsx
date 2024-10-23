import { useNavigate } from "react-router-dom";

const BoatNameAndPic = ({ details }: any) => {

  const navigate = useNavigate();
  

  const handleClick = () => {
navigate(`/boat-details/${details.boatId}`)
  };


  return (
    <div className="w-full p-2 bg-white mt-5 rounded-10 shadow-hoverShadow flex items-start gap-4 cursor-pointer" onClick={handleClick}>
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
