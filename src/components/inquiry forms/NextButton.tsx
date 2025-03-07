import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonFunc from '@/components/ui/buttons/Button';

interface NextButtonProps { 
    onClick: () => any;
}

const NextButton: React.FC<NextButtonProps> = ({onClick}) => {
    const { t } = useTranslation();
  return (
    <div className="w-[320px] mt-10">
      <ButtonFunc
        text={t("next")}
        onClick={onClick}
      />
    </div>
  );
}

export default NextButton
