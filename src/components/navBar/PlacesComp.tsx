import React from 'react'
import { AppContext } from '../../App'






const PlacesButtons = ({ place }: any) => {

const handleClick = (event: any) => {
          event.stopPropagation();
          setPcSelected("when");
          setWhere(place.placeName);
          setMobileSelected("when");
}



  const { setWhere, setPcSelected, setMobileSelected } = React.useContext(AppContext);
  return (
    <button
      className="w-[95%] h-[72px] p-2 rounded-10 flex gap-2 hover:bg-emptyInput"
      onClick={handleClick}
    >
      <img
        src={place.image}
        className="h-[56px] w-[56px] object-cover object-center"
      />

      <div className="text h-full flex flex-col justify-around items-start">
        <p className="font-medium">{place.placeName}</p>
        <p className="text-sm font-medium text-writingGrey">more infos</p>
      </div>
    </button>
  );
};

export default PlacesButtons
