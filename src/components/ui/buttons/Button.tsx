import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";


interface ButtonProps {
  text: string;
  color?: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  textColor?: string;
  onClick?: () => void;
  Icon?: any;
}

  const mainColor = "#FF385C";

const ButtonFunc = ({ text, loading = false, type = "button", color = mainColor, textColor = "white", onClick, Icon }: ButtonProps) => {

  // console.log(loading);
  const { t } = useTranslation();
  return (
    <Button
      variant="outlined"
      fullWidth
      disabled={loading}
      loading={loading}
      type={type}
      onClick={onClick ? onClick : () => {}}
      sx={{
        backgroundColor: loading ? "#999999" : color,
        color: textColor,
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: "Outfit, sans-serif",
        border: "none",
        "&:hover": {
          backgroundColor: color,
          opacity: 0.8,
        },
      }}
    >
      {Icon}
      <span className="mx-2">{loading ? t("loading") + "..." : text}</span>
    </Button>
  );
};

export default ButtonFunc;
