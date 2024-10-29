import { TiPin } from "react-icons/ti";
import { useTranslation } from "react-i18next";

const Offers = ({ ship }: any) => {
    const { t } = useTranslation();
    return (
      <>
        <p className="font-semibold text-writingMainDark text-[18px] lg:text-[20px]">
          {t("what_this_accommodation_offers")}
        </p>

        <div className="offers grid grid-cols-1 mt-3 gap-2 lg:mt-5 xl:grid-cols-2">
          {ship.Benefits.map((offer: any, index: number) => (
            <div key={index} className="offer flex items-center gap-2">
              <TiPin className="pin text-[22px] text-writingMainDark lg:text-[26px]" />
              <p className="text-writingMainDark text-sm lg:text-base">
                {t(offer.name)}
              </p>
            </div>
          ))}
        </div>
      </>
    );
};

export default Offers;
