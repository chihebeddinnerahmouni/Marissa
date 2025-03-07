import { useTranslation } from "react-i18next"
import ButtonFunc from "../ui/buttons/Button"
import { useNavigate } from 'react-router-dom'


const ContinueButton = ({ onClick }: any) => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-[200px] mt-4 flex gap-2">
      <ButtonFunc text={t("back")} onClick={() => navigate(-1)} color="grey" />
      <ButtonFunc text={t("continue")} onClick={onClick} />
    </div>
  );
}

export default ContinueButton
