import { MenuItem } from "@mui/material";
import Language from "@/components/navBar/Mobile/Language";

const LanguageFunc = () => {

  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2"
    >
      <Language />
      {/* khkhkh */}
    </MenuItem>
  );
};

export default LanguageFunc;
