import ShipTypeComp from "../components/Landing page/ShipTypeComp";
import ListingButton from "../components/Landing page/ListingButton";

const ShipsTypes = ({shipsTypes, selectedType, setSelectedType}: any) => {


    return (
      <div className="relative flex items-center justify-between w-full h-16 pt-2 lg:h-24 lg:justify-center">
       {/* <div className="fixed top-[73px] buttomShadow z-10 w-full h-[54px] pt-2 px-4 bg-white flex items-center justify-between md:px-20 lg:top-[95px] lg:px-[120px] lg:h-[65px] lg:justify-center lg:pt-0"> to fix the types*/}
        <div className="components flex items-center h-full gap-6 lg:gap-10">
          {shipsTypes.map((shipType: any, index: number) => (
            <ShipTypeComp
              key={index}
              shipType={shipType}
              selected={selectedType}
              setSelected={setSelectedType}
            />
          ))}
        </div>
        <ListingButton />
      </div>
    );
};

export default ShipsTypes;
