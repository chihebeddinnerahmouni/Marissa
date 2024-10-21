import { useState, useRef, useEffect } from "react";



const CommentComp = ({ comment }: any) => {
    
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const paraRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (
      paraRef.current &&
      paraRef.current.scrollHeight > paraRef.current.clientHeight
    ) {
      setHasOverflow(true);
    }
  }, [comment]);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="top w-full flex items-center h-[52px] gap-3">
        <img
          src={comment.profilePic}
          className="w-[52px] h-full object-cover object-center rounded-50"
          alt="profilePic"
        />
        <div className="flex flex-col justify-center h-full">
          <h1 className="font-bold text-writingMainDark">M.{comment.name}</h1>
          <p className="text-gray-400 text-sm">{comment.date}</p>
        </div>
      </div>

      <p
        ref={paraRef}
        className={`text-writingMainDark ${
          isExpanded ? "" : "max-h-[75px] overflow-hidden"
        }`}
      >
        {comment.comment}
      </p>
      {hasOverflow && (
        <button className="mt-[-10px] text-sm text-gray-400" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default CommentComp
