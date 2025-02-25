import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LuBanknote } from "react-icons/lu";


const Transactions = () => {
  const { t } = useTranslation();

  return (
    <MenuItem className="user flex items-center gap-2">
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
