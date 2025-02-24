// import ShipTypeComp from "../../components/Landing page/ShipTypeComp";
// import ListingButton from "../../components/Landing page/ListingButton";

// const ShipsTypes = ({
//   shipsTypes,
//   selectedType,
//   setSelectedType,
//   listingOption,
//   setListingOption,
// }: any) => {
//   return (
//     <div className="relative flex items-center justify-between w-full h-16 pt-2 lg:h-24 lg:justify-center">
//       <div className="components flex items-center h-full gap-6 lg:gap-10 max-w-[200px] overflow-auto md:max-w-[320px] lg:max-w-[400px] xl:max-w-[500px]">
//         {shipsTypes.map((shipType: any, index: number) => (
//           <ShipTypeComp
//             key={index}
//             shipType={shipType}
//             selected={selectedType}
//             setSelected={setSelectedType}
//           />
//         ))}
//       </div>
//       <ListingButton
//         listingOption={listingOption}
//         setListingOption={setListingOption}
//       />
//     </div>
//   );
// };

// export default ShipsTypes;

import { useRef, useEffect } from "react";
import ShipTypeComp from "../../components/Landing page/ShipTypeComp";
import ListingButton from "../../components/Landing page/ListingButton";

interface Props {
  shipsTypes: any;
  selectedType: any;
  setSelectedType: any;
  listingOption: any;
  setListingOption: any;
}

const ShipsTypes = ({
  shipsTypes,
  selectedType,
  setSelectedType,
  listingOption,
  setListingOption,
}: Props) => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  // console.log(shipsTypes);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
      };

      const handleMouseUp = () => {
        isDown = false;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast
        container.scrollLeft = scrollLeft - walk;
      };

      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="relative flex items-center justify-between w-full h-16 pt-2 lg:h-24 lg:justify-center">
      <div
        ref={containerRef}
        className="components flex items-center h-full gap-6 lg:gap-10 max-w-[200px] overflow-auto md:max-w-[320px] lg:max-w-[400px] xl:max-w-[500px] unselectable"
      >
        {shipsTypes.map((shipType: any, index: number) => (
          <ShipTypeComp
            key={index}
            shipType={shipType}
            selected={selectedType}
            setSelected={setSelectedType}
          />
        ))}
      </div>

      <ListingButton
        listingOption={listingOption}
        setListingOption={setListingOption}
      />
    </div>
  );
};

export default ShipsTypes;
