import React from 'react'
import { AppContext } from '../../App'
import { NavBarContext } from '../ui/NavBar';
import {useTranslation} from 'react-i18next'






const PlacesButtons = ({ place }: any) => {

const handleClick = (event: any) => {
  event.stopPropagation();
          setPcSelected("when");
          setWhere(place);
          setMobileSelected("when");
}

  const { setPcSelected, setMobileSelected } = React.useContext(AppContext);
  const { setWhere } = React.useContext(NavBarContext);
  const { i18n } = useTranslation();


  return (
    <button
      className="w-[100%] overflow-hidden h-[72px] p-2 rounded-10 flex gap-2 hover:bg-emptyInput "
      onClick={handleClick}
    >
      <img
        src={place.image ? place.image : "/anonyme.jpg"}
        className="h-[56px] w-[56px] object-cover object-center"
      />

      <div className="text w-[100%] h-full flex flex-col justify-around items-start">
        <p className="font-medium">{i18n.language === "ar" ? place.arabic_name : place.name}</p>
        <p className="text-sm font-medium text-writingGrey text-start ellipsesCss" style={{width: 'calc(100% - 72px)'}}>
          {place.description}
        </p>
      </div>
    </button>
  );
};

export default PlacesButtons
