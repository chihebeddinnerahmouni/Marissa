import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import UpdateName from "./UpdateName";
import { useTranslation } from "react-i18next";

interface NamePicProps {
  title: string;
  image: string;
  changed: boolean;
  setChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const NamePic: React.FC<NamePicProps> = ({ title, image, setChanged }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;

  return (
    <div className="relative w-full p-2 bg-white mt-5 rounded-10 shadow-sm flex items-start gap-4 cursor-pointer">
      <img
        // src={image}
        src={`${urlListing}/${image}`}
        className="w-[130px] h-[90px] object-cover object-center rounded-10"
        alt="profile"
      />
      <div className="text">
        <p className="font-bold">{t("name")}</p>
        <p className="text-[18px]">{title}</p>
      </div>

      {/* Edit buttons */}
      <div
        className={`absolute top-1  flex gap-2 ${
          i18n.language === "ar" ? "left-2" : "right-2"
        }`}
      >
        <button onClick={() => setIsOpen(!isOpen)}>
          <HiOutlineDotsHorizontal className="text-writingGrey text-[30px]" />
        </button>
      </div>

      {isOpen && (
        <UpdateName
          setIsOpen={setIsOpen}
          setChanged={setChanged}
          title={title}
        />
      )}
    </div>
  );
};

export default NamePic;
