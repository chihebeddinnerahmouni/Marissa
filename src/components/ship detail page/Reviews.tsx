import CommentComp from "./CommentComp"

const Reviews = ({ship}: any) => {
  return (
    <div className="w-full grid grid-cols-1 gap-7 lg:gap-10">
      {ship.reviews.map((comment: any, index: number) => (
        <CommentComp key={index} comment={comment} />
      ))}
    </div>
  );
}

export default Reviews
