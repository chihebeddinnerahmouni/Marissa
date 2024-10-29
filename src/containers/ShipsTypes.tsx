import ShipTypeComp from "../components/Landing page/ShipTypeComp";
import ListingButton from "../components/Landing page/ListingButton";

const ShipsTypes = ({shipsTypes, selectedType, setSelectedType}: any) => {



    return (
      <div className="relative flex items-center justify-between w-full h-16 pt-2 lg:h-24 lg:justify-center">
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
