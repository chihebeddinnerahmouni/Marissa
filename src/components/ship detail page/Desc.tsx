import { useTranslation } from "react-i18next";
import { useState } from "react";

const Desc = ({ description }: any) => {
  const maxLetters = 200;
  const hasOverflow = description.length > maxLetters;
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 relative">
      <div className="text flex flex-col">
        <p className="font-bold">{t("description")}</p>
        <p className="break-all">
          {isExpanded || !hasOverflow
            ? description
            : `${description.substring(0, maxLetters)}...`}
        </p>
        {hasOverflow && (
          <button
            className="mt-[0px] text-sm text-writingGrey mx-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? t("hide") : t("show_more")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Desc;
