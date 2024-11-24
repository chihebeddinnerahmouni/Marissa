import CommentComp from "./CommentComp"
import { useTranslation } from "react-i18next"

const Reviews = ({ ship }: any) => {
  
  const { t } = useTranslation();

  // console.log(ship);

  return (
    <div className="w-full grid grid-cols-1 gap-7 lg:gap-10">
      <p className="font-bold">{t("reviews")}</p>

      {ship.reviews.length === 0 ? (
        <>
          <p className="text-writingGrey mx-auto">{t("no_reviews_yet")}</p>
        </>
      ) : (
        <>
          {ship.reviews.map(
            (comment: any, index: number) =>
              comment.review_content && (
                <CommentComp key={index} comment={comment} />
              )
          )}
        </>
      )}

      {/* {ship.reviews.map(
        (comment: any, index: number) =>
          comment.review_content && (
            <CommentComp key={index} comment={comment} />
          )
      )} */}
    </div>
  );
}

export default Reviews
