import {useState} from 'react'
import { CiFilter } from 'react-icons/ci'
import ListingListModal from './ListingListModal';
import listingOptionArray from "../../assets/files/ListingOptionArray";
import FilterSheet from '@/containers/FilterSheet';
import { useMediaQuery } from "react-responsive";
import { CiBoxList } from "react-icons/ci";


const ListingComp = () => {

  const isMobile = useMediaQuery({ query: "(max-width: 648px)" });

  const [isListingOptionOpen, setIsListingOptionOpen] = useState(false);
  const [listItem, setListItem] = useState(listingOptionArray[0]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  

  const handleClick = () => {
    setIsListingOptionOpen(!isListingOptionOpen);
  }

  return (
    <div className="flex items-center gap-2 lg:absolute lg:right-[0px]">
      <button
        className="w-[30px] h-[30px] lg:w-[37px] lg:h-[37px] rounded-50 flex justify-center items-center border-1 border-writingGrey text-writingGrey hover:border-main hover:text-main hover:shadow-hoverShadow"
        onClick={() => setIsSheetOpen(true)}
      >
        <CiFilter className="lg:text-[20px]" />
      </button>

      <div
        className={`border-1 rounded-20 flex justify-center items-center cursor-pointer px-4 py-1.5 text-[10px] lg:text-sm hover:shadow-hoverShadow text-nowrap ${
          isListingOptionOpen
            ? "border-writingMainDark text-writingMainDark"
            : "text-writingGrey border-writingGrey hover:border-mainHover hover:text-mainHover"
        }`}
        onClick={handleClick}
      >
        {isMobile ? <CiBoxList className='text-[18px]'/> : listItem}

        {isListingOptionOpen && (
          <ListingListModal
            isListingOptionOpen={isListingOptionOpen}
            setIsListingOptionOpen={setIsListingOptionOpen}
            setListItem={setListItem}
            listingOptionArray={listingOptionArray}
          />
        )}
      </div>

      {isSheetOpen && (
        <FilterSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      )}
    </div>
  );
}

export default ListingComp
