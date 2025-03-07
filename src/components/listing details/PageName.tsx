import { useTranslation } from 'react-i18next'


const PageName = ({text}: {text: string}) => {

    const { t } = useTranslation();

  return (
    <div className="title flex items-center mb-5 gap-2 w-full">
      <p className="text-[25px] font-bold">{t(text)}</p>
    </div>
  );
}

export default PageName
