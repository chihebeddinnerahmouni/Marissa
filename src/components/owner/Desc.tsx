import { CiTextAlignLeft } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import UpdateDesc from "./UpdateDesc";

const Desc = ({ description }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const maxLetters = 200;
  const hasOverflow = description.length > maxLetters;
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, i18n } = useTranslation();

  

  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <div className="preferedDate flex items-center gap-4">
        <p>
          <CiTextAlignLeft className="text-writingGrey text-[30px]" />
        </p>

        <div className="text">
          <p className="font-bold">{t("description")}</p>
          {/* <p
            className={`${
              i18n.language === "ar" ? "text-right" : "text-left"
            }`}
          > */}
          <p>
            {isExpanded || !hasOverflow
              ? description
              : `${description.substring(0, maxLetters)}...`}
            {hasOverflow && (
              <button
                className="mt-[-10px] text-sm text-writingGrey"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? t("show_less") : t("show_more")}
              </button>
            )}
          </p>
        </div>
      </div>

      <div
        className={`absolute top-1 flex gap-2 ${
          i18n.language === "ar" ? "left-2" : "right-2"
        }`}
      >
        <button onClick={() => setIsOpen(!isOpen)}>
          <HiOutlineDotsHorizontal className="text-writingGrey text-[30px]" />
        </button>
      </div>

      {isOpen && <UpdateDesc setIsOpen={setIsOpen} description={description} />}
    </div>
  );
};

export default Desc;


// import { CiTextAlignLeft } from "react-icons/ci";
// import { useTranslation } from "react-i18next";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { useState } from "react";
// import UpdateDesc from "./UpdateDesc";

// const Desc = ({ description, setChanged }: any) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const { t, i18n } = useTranslation();

//   const toggleReadMore = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
//       <div className="preferedDate flex items-center gap-4">
//         <p>
//           <CiTextAlignLeft className="text-writingGrey text-[30px]" />
//         </p>

//         <div className="text">
//           <p className="font-bold">{t("description")}</p>
//           <p>
//             {isExpanded ? description : `${description.substring(0, 100)}...`}
//             <button
//               onClick={toggleReadMore}
//               className="text-writingGrey mx-2"
//             >
//               {isExpanded ? t("hide") : t("more")}
//             </button>
//           </p>
//         </div>
//       </div>

//       <div
//         className={`absolute top-1 flex gap-2 ${
//           i18n.language === "ar" ? "left-2" : "right-2"
//         }`}
//       >
//         <button onClick={() => setIsOpen(!isOpen)}>
//           <HiOutlineDotsHorizontal className="text-writingGrey text-[30px]" />
//         </button>
//       </div>

//       {isOpen && (
//         <UpdateDesc
//           setIsOpen={setIsOpen}
//           description={description}
//           setChanged={setChanged}
//         />
//       )}
//     </div>
//   );
// };

// export default Desc;