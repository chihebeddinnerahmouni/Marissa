import { Link } from "react-router-dom";
import { BsInbox } from "react-icons/bs";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const Inbox = () => {
  const { t } = useTranslation();

  return (
    <MenuItem className="user flex items-center gap-2">
      <Link
        to={"/inbox"}
        className="w-full flex items-center gap-2 text-writingMainDark"
      >
        <BsInbox className="text-[20px]" />
        <p>{t("inbox")}</p>
      </Link>
    </MenuItem>
  );
};

export default Inbox;
