import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
import React from 'react'

interface ListingListModalProps { 
  isListingOptionOpen: boolean;
  setIsListingOptionOpen: (value: boolean) => void;
  listingOptionArray: any;
  setListingOption: any;
}

const ListingListModal: React.FC<ListingListModalProps> = ({
  isListingOptionOpen,
  setIsListingOptionOpen,
  listingOptionArray,
  setListingOption,
}) => {
  const { i18n, t } = useTranslation();

  const stop = (event: any) => {
    event.stopPropagation();
  };

  return (
    <ReactModal
      isOpen={isListingOptionOpen}
      onRequestClose={() => setIsListingOptionOpen(false)}
      contentLabel="Contact Modal"
      ariaHideApp={false}
      className={`outline-none absolute top-[100px] shadow-hardShadow bg-white rounded-20  lg:top-[130px] ${
        i18n.language === "en"
          ? "right-[23px] md:right-[80px] 2xl:right-[220px] lg:right-[120px] w-[160px] lg:w-[200px]"
          : "left-[23px] md:left-[80px] 2xl:right-[260px] lg:right-[170px] w-[200px] lg:w-[250px]"
      } `}
      overlayClassName="fixed overflow-hidden inset-0 backdrop-blur-[4px] z-20"
    >
      <div
        className="w-full h-full p-3 flex flex-col gap-2 justify-start lg:p-5  lg:gap-3"
        onClick={stop}
      >
        {listingOptionArray.map((option: any, index: number) => (
          <React.Fragment key={index}>
            <button
              key={index}
              className="text-[12px] text-writingMainDark font-medium overflow-hidden ellipsesCss hover:text-mainHover lg:text-sm"
              onClick={() => {
                setListingOption(option.id);
                setIsListingOptionOpen(false);
              }}
            >
              {t(option.name)}
            </button>
            {index !== listingOptionArray.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </ReactModal>
  );
};

export default ListingListModal;
