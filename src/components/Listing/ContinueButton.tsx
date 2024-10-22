import { useTranslation } from "react-i18next"

const ContinueButton = ({ onClick }: any) => {
    const { t } = useTranslation();
  return (
      <button className="w-[100px] h-[40px] flex justify-center items-center bg-main mt-4 text-white rounded-60 hover:bg-mainHover"
      onClick={onClick}
      >
          {t("continue")}
    </button>
  )
}

export default ContinueButton
