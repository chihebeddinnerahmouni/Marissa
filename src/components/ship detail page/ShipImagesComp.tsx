import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ShipImagesComp = ({ ship }: any) => {

  const [index, setIndex] = useState(-1);
  

  return (
    <div className="all grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-6 lg:rounded-10 overflow-hidden">
      <img
        src={ship.mainPic}
        className="h-[230px] w-full object-cover object-center rounded-10 md:h-[350px] lg:rounded-none lg:col-span-6 lg:h-full"
        alt="ship"
        onClick={() => setIndex(0)}
      />
      <div className="additionalPics flex gap-2 overflow-auto pb-1 lg:grid lg:grid-cols-2 lg:grid-auto-rows minmax(100px, auto) lg:grid-auto-flow row lg:col-span-6 lg:gap-4 lg:pb-0" >
        {ship.addPics.map((pic: string, index: number) => {
          return (
            <img
              key={index}
              src={pic}
              alt="ship"
              onClick={() => setIndex(index + 1)}
              className="w-[130px] h-[85px] object-cover object-center rounded-10 md:flex-grow md:h-[100px] lg:rounded-none lg:w-full lg:h-full"
            />
          );
        })}
      </div>
      {/* <div className="all grid grid-cols-1 gap-2 xl:grid-cols-12 xl:gap-2 xl:rounded-10 overflow-hidden xl:h-[420px] 2xl:h-[500px]">
      <img
        src={ship.mainPic}
        className="h-[230px] w-full object-cover object-center rounded-10 md:h-[350px] cursor-pointer lg:h-[440px] xl:rounded-none xl:col-span-6 xl:h-full"
        alt="ship"
        onClick={() => setIndex(0)}
      />
      <div className="additionalPics flex gap-2 overflow-auto pb-1 cursor-pointer xl:grid xl:grid-cols-2 xl:col-span-6 xl:gap-1 xl:pb-0">
        {ship.addPics.map((pic: string, index: number) => {
          return (
            <img
              key={index + 1}
              src={pic}
              alt="ship"
              onClick={() => setIndex(index + 1)}
              className="flex-grow min-w-[130px] h-[85px] object-cover object-center rounded-10 md:flex-grow md:h-[100px] lg:flex-grow lg:h-[140px] xl:rounded-none xl:w-full xl:h-full"
            />
          );
        })}
      </div> */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Fullscreen]}
        slides={[
          { src: ship.mainPic },
          { src: ship.addPics[0] },
          { src: ship.addPics[1] },
          { src: ship.addPics[2] },
          { src: ship.addPics[3] },
        ]}
      />
    </div>
  );
};

export default ShipImagesComp;
