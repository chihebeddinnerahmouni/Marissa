import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import options from "../../assets/files/inbox/filter_categories";

const Filter = ({ selectedFilter, setSelectedFilter }: any) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isFilterOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative w-full">
      <Button
        className="flex items-center gap-3 text-sm text-main"
        onClick={handleClick}
        sx={{ fontFamily: "Cairo, sans-serif" }}
      >
        <span className="text-main">{t(selectedFilter)}</span>{" "}
        {isFilterOpen ? (
          <FaChevronUp className="text-main" />
        ) : (
          <FaChevronDown className="text-main" />
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={isFilterOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: i18n.language === "en" ? "left" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: i18n.language === "en" ? "left" : "right",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            sx={{
              "&:hover": {
                backgroundColor: "#f7f7f7",
              },
              width: "200px",
              fontFamily: "Cairo, sans-serif",
            }}
            onClick={() => {
              setSelectedFilter(option);
              handleClose();
            }}
          >
            {t(option)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Filter;
