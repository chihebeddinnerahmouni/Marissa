import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ButtonFunc from "@/components/ui/buttons/Button";

const image = "/listing-done.jpg"

const ListingDone = () => { 


    const navigate = useNavigate();
    const { t } = useTranslation();

    const onClick = () => {
        navigate("/");
    }

    
  return (
    <div className="w-full">
      <div className="content grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:max-w-[1600px]">
        <LazyLoadImage
          src={image}
          alt="sea"
          className="w-full h-40 object-cover object-center md:h-60 lg:h-80"
          effect="blur"
        />
        <div className="text flex flex-col gap-2">
          <p className="font-bold text-writingMainDark text-[30px] leading-tight lg:text-[42px]">
            {t("thanks_we_received_your_response")}
          </p>
          <p className="opacity-80 lg:text-[18px]">
            {t("your_request_is_being_reviewed")}
          </p>
        </div>
        <div className="mt-4 w-[100px]">
          <ButtonFunc
            text={t("ok")}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}

export default ListingDone
