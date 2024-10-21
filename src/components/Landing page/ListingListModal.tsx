import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
// import listingOptionArray from "../../assets/files/ListingOptionArray";
import React from 'react'


interface ListingListModalProps { // ts props for the component
  isListingOptionOpen: boolean;
  setIsListingOptionOpen: (value: boolean) => void;
  setListItem: (value: string) => void;
  listingOptionArray: string[];
}

const ListingListModal: React.FC<ListingListModalProps> = ({ // the main functoin of this component
  isListingOptionOpen,
  setIsListingOptionOpen,
  setListItem,
  listingOptionArray,
}) => {
  const { i18n } = useTranslation();

  const stop = (event: any) => {
    event.stopPropagation();
  };

  return (
    <ReactModal
      isOpen={isListingOptionOpen}
      onRequestClose={() => setIsListingOptionOpen(false)}
      contentLabel="Contact Modal"
      ariaHideApp={false}
      className={`outline-none w-[160px] absolute top-[100px] shadow-hardShadow bg-white rounded-20  lg:top-[130px] ${
        i18n.language === "en"
          ? "right-[23px] md:right-[80px] 2xl:right-[220px] lg:right-[120px]"
          : "left-[23px] md:left-[80px] 2xl:right-[260px] lg:right-[170px]"
      } lg:w-[200px]`}
      overlayClassName="fixed overflow-hidden inset-0 backdrop-blur-[4px] z-20"
    >
      <div
        className="w-full h-full p-3 flex flex-col gap-2 justify-start lg:p-5  lg:gap-3"
        onClick={stop}
      >
        {listingOptionArray.map((option: string, index: number) => (
          <React.Fragment key={index}>
            <button
              key={index}
              className="text-[12px] text-writingMainDark font-medium overflow-hidden text-overflow-ellipsis whitespace-nowrap hover:text-mainHover lg:text-sm"
              onClick={() => {
                setListItem(option);
                setIsListingOptionOpen(false);
              }}
            >
              {option}
            </button>
            {index !== listingOptionArray.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </ReactModal>
  );
};

export default ListingListModal;
