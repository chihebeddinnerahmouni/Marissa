import React from "react";
import { useTranslation } from "react-i18next";

interface ChoiceButtonProps {
  choice: string;
  text: string;
  value: string[];
  setValue: (choice: string) => void;
  checkValue: string;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  text,
  value,
  setValue,
  checkValue,
}) => {
  const { t } = useTranslation();

  const isSelected = value.includes(checkValue);

  return (
    <div
      className={`inline-flex items-center bg-lightGrey gap-2 p-1.5 pr-3 rounded-60 cursor-pointer
      ${isSelected ? "border-2 border-main" : "border-2 border-darkGrey"}
      `}
      onClick={() => setValue(checkValue)}
    >
      <p
        className={`w-[30px] h-[30px] flex items-center justify-center rounded-50 ${
          isSelected ? "bg-main text-white" : "bg-white text-writingMainDark"
        }
        `}
      >
        {t(choice)}
      </p>
      <p className="text-writingMainDark font-medium">{t(text)}</p>
    </div>
  );
};

export default ChoiceButton;