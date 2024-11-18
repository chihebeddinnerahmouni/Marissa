import { useTranslation } from "react-i18next";

const ButtomMessages = ({ onClick, newMessage, setNewMessage }: any) => {
  const { t } = useTranslation();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div className="w-full fixed px-4 h-[60px] bg-creme shadow-hoverShadow bottom-0 py-2 lg:h-[70px] flex justify-center items-center gap-2">
      <input
        type="text"
        placeholder={t("message")}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="relative w-full h-full px-3 rounded-10 bg-emptyInput border-1 border-main text-writingMainDark font-medium outline-main md:w-[500px] xl:w-[600px]"
      />
      <button
        className="w-[70px] h-full bg-main text-white rounded-10 hover:bg-mainHover"
        onClick={onClick}
      >
        {t("send")}
      </button>
    </div>
  );
};

export default ButtomMessages;

