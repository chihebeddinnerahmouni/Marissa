import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Captain = () => {
  const { boatId } = useParams<{ boatId: string }>();
  const navigate = useNavigate();

  return (
    <div className="all flex flex-col items-center">
      captain
      <button
        onClick={() => {
          navigate(`/inquiry/${boatId}/extra`);
        }}
        className="w-[320px] h-10 bg-mainBlue text-white bg-main rounded-[5px] mt-5"
      >
        {/* {t("continue")} */}
        next
      </button>
    </div>
  );
};

export default Captain;
