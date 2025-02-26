import { Link } from "react-router-dom";
import { BsInbox } from "react-icons/bs";
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const Inbox = ({ close }: { close: any }) => {
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
