import React from 'react'
import StarRatings from "react-star-ratings"

const RatingByStars = () => {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <p className="text-sm font-medium text-writingGrey lg:text-base">
        {/* {t(review.title)} */}
        communication
      </p>
      <StarRatings
        rating={Math.floor(ship.averageRatings.communication)}
        starRatedColor="#FFD700"
        numberOfStars={5}
        name="rating"
        starDimension="20px"
        starSpacing="1px"
      />
    </div>
  );
}

export default RatingByStars
