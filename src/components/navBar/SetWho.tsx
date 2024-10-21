// import { useTranslation } from 'react-i18next'
import Whos_guests from '../../assets/files/Who_guests'
import AgesButtons from './AgesComp';
import React from 'react'

const SetWho = () => {

  // const { i18n } = useTranslation();

  return (
    <div
      className={`w-full flex flex-col items-center gap-8 bg-white`}
    >
      {Whos_guests.map((category, index) => (
        <React.Fragment key={index}>
          <AgesButtons category={category} />
          {index !== Whos_guests.length - 1 && <hr className='w-full'/>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default SetWho
