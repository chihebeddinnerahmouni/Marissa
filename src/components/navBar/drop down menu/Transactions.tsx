import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LuBanknote } from "react-icons/lu";


const Transactions = ({ close }: { close: any }) => {
  const { t } = useTranslation();

  return (
    <MenuItem
      sx={{
        "&:hover": { backgroundColor: "#f5f5f5" },
        fontFamily: "Cairo, sans-serif",
      }}
      className="user flex items-center gap-2"
      onClick={close}
    >
      <Link
        to={"/my-transactions"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <LuBanknote className="text-[20px]" />
        <p>{t("my_transactions")}</p>
      </Link>
    </MenuItem>
  );
};

export default Transactions;
