
import React from 'react';
import { useTranslation } from 'react-i18next';

interface NextButtonProps { 
    onClick: () => any;
}

const NextButton: React.FC<NextButtonProps> = ({onClick}) => {
    const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      className="w-[320px] h-10 bg-mainBlue text-white bg-main rounded-[5px] mt-10"
    >
      {t("next")}
    </button>
  );
}

export default NextButton
