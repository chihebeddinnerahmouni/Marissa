import { CiBoxList } from "react-icons/ci";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import listingOptionArray from "../../assets/files/ListingOptionArray";


interface Props {
  listingOption: any;
  setListingOption: any;
}

const mainColor = "#FF385C";

const ListingListModal = ({ listingOption, setListingOption }: Props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 648px)" });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option: (typeof listingOptionArray)[0]) => {
    setListingOption(option);
    handleMenuClose();
  };
  return (
    <>
      <button
        className={`border-1 rounded-20 flex justify-center items-center cursor-pointer px-4 py-1.5 text-[10px] lg:text-sm hover:shadow-hoverShadow text-nowrap ${
          anchorEl
            ? "border-writingMainDark text-writingMainDark"
            : "text-writingGrey border-writingGrey hover:border-main hover:text-main"
        }`}
        onClick={handleMenuOpen}
      >
        {isMobile ? (
          <CiBoxList className="text-[18px]" />
        ) : (
          t(
            listingOptionArray.find(
              (option: any) => option.id === listingOption.id
            )?.name || ""
          )
        )}
      </button>

      <Menu
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            // marginTop: !isLarge ? "74px" : "95px",
            // marginTop: "95px",
          },
        }}
        // sx={{
        //   "& .MuiPaper-root": {
        //     boxShadow: "none",
        //     borderRadius: "20px",
        //   },
        // }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {listingOptionArray.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.id === listingOption.id}
            onClick={() => handleOptionSelect(option)}
            sx={{
              fontFamily: "Cairo, sans-serif",
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Change this to your desired color
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Change this to your desired hover color
                },
              },
              "&:hover": {
                color: mainColor,
              },
            }}
          >
            <p className="textmain">{t(option.name)}</p>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ListingListModal
