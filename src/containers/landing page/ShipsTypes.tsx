import ShipTypeComp from "../../components/Landing page/ShipTypeComp";
import ListingButton from "../../components/Landing page/ListingButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useMemo } from "react";


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
  const settings = useMemo(() => ({
    dots: false,
    infinite: false,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1045,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  }), []);

  return (
    <div className="relative flex items-center justify-between w-full h-16 lg:h-24 lg:justifycenter">
      <Slider
        {...settings}
        className="w-full px-[20px] max-w-[230px] md:max-w-[320px] lg:max-w-[500px] xl:max-w-[500px]"
      >
        {shipsTypes.map((shipType: any, index: number) => (
          <ShipTypeComp
            key={index}
            shipType={shipType}
            selected={selectedType}
            setSelected={setSelectedType}
          />
        ))}
      </Slider>

      <ListingButton
        listingOption={listingOption}
        setListingOption={setListingOption}
      />
    </div>
  );
};

export default ShipsTypes;



const NextArrow = ({onClick}: any) => {
  return (
    <div
      className="absolute right-[0px] top-1/2 transform -translate-y-1/2 
                 w-[20px] h-[20px] flex justify-center items-center bg-gray-100 borderwritingGrey text-main rounded-full 
                 cursor-pointer  
                 transition-all duration-300 z10"
      onClick={onClick}
    >
      <MdNavigateNext />
    </div>
  );
};

const PrevArrow = ({ onClick }: any) => {
  return (
    <div
      className="absolute left-[0px] top-1/2 transform -translate-y-1/2 
                 w-[20px] h-[20px] flex justify-center items-center bg-gray-100 borderwritingGrey text-main rounded-full 
                 cursor-pointer  
                 transition-all duration-300 z10"
      onClick={onClick}
    >
      <GrFormPrevious />
    </div>
  );
};
