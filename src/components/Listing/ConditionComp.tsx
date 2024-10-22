
import React from 'react'
import { useTranslation } from 'react-i18next';


interface ConditionCompProps { 
    num: number;
    title: string;
    description: string;
}
const ConditionComp: React.FC<ConditionCompProps> = ({ num, title, description }) => {
    const { t } = useTranslation();
  return (
    <div className='flex flex-col'>
      
          <p className='font-bold text-writingGrey text-[18px]'>{num}.{t(title)}</p>
          <p className='text-writingMainDark'>{t(description)}</p>
    </div>
  )
}

export default ConditionComp
