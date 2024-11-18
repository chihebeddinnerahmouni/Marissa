import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ListingDone = () => { 


    const navigate = useNavigate();
    const { t } = useTranslation();

    const onClick = () => {
        navigate("/");
    }

    
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="content grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:max-w-[1600px]">
        <img
          src="https://getmyboat.zendesk.com/hc/theming_assets/01HZPJJZNAV3WPGYNSJCZBN9T9"
          alt="sea"
          className="w-full h-40 object-cover object-center md:h-60 lg:h-80"
        />
        <div className="text flex flex-col gap-2">
          <p className="font-bold text-writingMainDark text-[30px] leading-tight lg:text-[42px]">
            {t("thanks_we_received_your_response")}
          </p>
          <p className="opacity-80 lg:text-[18px]">
            {t("your_request_is_being_reviewed")}
          </p>
        </div>

        <button
          className="w-[100px] h-[40px] flex justify-center items-center bg-main mt-4 text-white rounded-60 hover:bg-mainHover"
          onClick={onClick}
        >
          {t("ok")}
        </button>
      </div>
    </div>
  );
}

export default ListingDone
