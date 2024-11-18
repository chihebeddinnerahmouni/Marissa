import RatingByStars from "./RatingByStars";

const ReviewByStars = ({ ship }: any) => {



  return (
    <div className="w-full grid grid-cols-1 gap-5 2xl:grid-cols-2 lg:gap-x-10">
      <RatingByStars
        title={"communication"}
        rating={ship.averageRatings.communication}
      />
      <RatingByStars
        title={"departure_return"}
        rating={ship.averageRatings.departure_return}
      />
      <RatingByStars
        title={"listing_accuracy"}
        rating={ship.averageRatings.listing_accuracy}
      />
      <RatingByStars
        title={"route_experience"}
        rating={ship.averageRatings.route_experience}
      />
      {/* <RatingByStars title={"value"} rating={ship.averageRatings.value} /> */}
      <RatingByStars
        title={"vessel_equipment"}
        rating={ship.averageRatings.vessel_equipment}
      />
    </div>
  );
}

export default ReviewByStars
