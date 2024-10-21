import CommentComp from "./CommentComp"

const Reviews = ({ship}: any) => {
  return (
    <div className="w-full grid grid-cols-1 gap-7 lg:gap-10">
      {ship.comments.map((comment: any) => (
        <CommentComp key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Reviews
