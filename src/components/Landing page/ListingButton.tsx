import {useState} from 'react'
import { CiFilter } from 'react-icons/ci'
import ListingListModal from './ListingListModal';
import listingOptionArray from "../../assets/files/ListingOptionArray";
import FilterSheet from '@/containers/landing page/FilterSheet';
import { useMediaQuery } from "react-responsive";
import { CiBoxList } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import Drawer from "@mui/material/Drawer";

const ListingComp = ({ listingOption, setListingOption }: any) => {
  const isMobile = useMediaQuery({ query: "(max-width: 648px)" });

  const [isListingOptionOpen, setIsListingOptionOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const { t } = useTranslation();

  const handleClick = () => {
    setIsListingOptionOpen(!isListingOptionOpen);
  };

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
            : "text-writingGrey border-writingGrey hover:border-main hover:text-main"
        }`}
        onClick={handleClick}
      >
        {isMobile ? (
          <CiBoxList className="text-[18px]" />
        ) : (
          t(
            listingOptionArray.find(
              (option: any) => option.id === listingOption
            )?.name || ""
          )
        )}

        {isListingOptionOpen && (
          <ListingListModal
            isListingOptionOpen={isListingOptionOpen}
            setIsListingOptionOpen={setIsListingOptionOpen}
            setListingOption={setListingOption}
            listingOptionArray={listingOptionArray}
          />
        )}
      </div>

      {/* {isSheetOpen && (
        <FilterSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      )} */}
      <Drawer
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
        anchor="left"
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      >
        <FilterSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
        />
      </Drawer>
    </div>
  );
};

export default ListingComp
