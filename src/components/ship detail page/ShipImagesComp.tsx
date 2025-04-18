// import { useState } from "react";
// import Lightbox from "yet-another-react-lightbox";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";

// const ShipImagesComp = ({ ship }: any) => {

//   const [index, setIndex] = useState(-1);
//   const url = import.meta.env.VITE_SERVER_URL_LISTING;

//   // console.log(ship);
  

//   return (
//     <div className="all grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-6 lg:rounded-10 overflow-hidden">
//       <img
//         src={`${url}/${ship.Images[0].url}`}
//         className="h-[230px] w-full object-cover object-center rounded-10 md:h-[350px] lg:rounded-none lg:col-span-6 lg:h-[430px] cursor-pointer"
//         alt="ship"
//         onClick={() => setIndex(0)}
//       />
//       <div className="additionalPics flex gap-2 overflow-auto pb-1 lg:grid lg:grid-cols-2 lg:grid-auto-rows minmax(100px, auto) lg:grid-auto-flow row lg:col-span-6 lg:gap-4 lg:pb-0">
//         {ship.Images.slice(1, 5).map((pic: any, index: number) => {
//           return (
//             <img
//               key={index}
//               src={`${import.meta.env.VITE_SERVER_URL_LISTING}/${pic.url}`}
//               alt="ship"
//               onClick={() => setIndex(index + 1)}
//               className="w-[130px] h-[85px] object-cover object-center rounded-10 md:flex-grow md:h-[100px] lg:rounded-none lg:w-full lg:h-[207px] cursor-pointer"
//             />
//           );
//         })}
//       </div>
//       <Lightbox
//         open={index >= 0}
//         index={index}
//         close={() => setIndex(-1)}
//         plugins={[Thumbnails, Fullscreen]}
//         slides={ship.Images.map((pic: any) => ({
//           src: `${url}/${pic.url}`,
//         }))}
//       />
//     </div>
//   );
// };

// export default ShipImagesComp;


import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ShipImagesComp = ({ ship }: any) => {
  const [index, setIndex] = useState(-1);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  return (
    <div className="all grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-6 lg:rounded-10 overflow-hidden">
      <div className="w-full hfull lg:col-span-6">
        <LazyLoadImage
          src={`${url}/${ship.Images[0].url}`}
          width="100%"
          className="h-[230px] hfull wfull object-cover object-center rounded-10 md:h-[350px] lg:rounded-none lg:h-[430px] cursor-pointer lg:rounded-l-10"
          alt="ship"
          effect="blur"
          onClick={() => setIndex(0)}
        />
      </div>
      <div className="additionalPics flex gap-2 overflow-auto pb-1 lg:grid lg:grid-cols-2 lg:grid-auto-rows minmax(100px, auto) lg:grid-auto-flow row lg:col-span-6 lg:gap-4 lg:pb-0">
        {ship.Images.slice(1, 5).map((pic: any, index: number) => {
          return (
            <LazyLoadImage
              key={index}
              src={`${import.meta.env.VITE_SERVER_URL_LISTING}/${pic.url}`}
              alt="ship"
              effect="blur"
              onClick={() => setIndex(index + 1)}
              className="w-[130px] h-[85px] object-cover object-center rounded-10 md:flex-grow md:h-[100px] lg:rounded-none lg:w-full lg:h-[207px] cursor-pointer"
            />
          );
        })}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Thumbnails, Fullscreen]}
        slides={ship.Images.map((pic: any) => ({
          src: `${url}/${pic.url}`,
        }))}
      />
    </div>
  );
};

export default ShipImagesComp;