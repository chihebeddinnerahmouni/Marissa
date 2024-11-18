import { useTranslation } from 'react-i18next'
import { HiArrowSmallLeft } from 'react-icons/hi2'
import { HiArrowSmallRight } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'


const PageName = ({text}: {text: string}) => {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

  return (
    <div className="title flex items-center mb-5 gap-2 w-full">
      <button onClick={() => navigate(-1)}>
        {i18n.language === "ar" ? (
          <HiArrowSmallRight className="text-[30px] lg:text-[40px]" />
        ) : (
          <HiArrowSmallLeft className="text-[30px] lg:text-[40px]" />
        )}
      </button>
      <p className="text-[25px] font-bold">{t(text)}</p>
    </div>
  );
}

export default PageName
