import React from 'react'
import { useTranslation } from 'react-i18next';


interface ChoiceButtonProps {
    choice: string;
    text: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  checkValue: string;
  id: string;
    }

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, text, value, setValue, id }) => {
    const { t } = useTranslation();
  return (
    <div
      className={`w-full flex items-center bg-lightGrey gap-2 p-1.5 rounded-60 cursor-pointer
      ${
        value === id
          ? "border-2 border-main"
          : "border-2 border-darkGrey"
      }
      `}
      onClick={() => setValue(id)}
    >
      <p
        className={`w-[30px] h-[30px] flex items-center justify-center rounded-50 ${
          value === id
            ? "bg-main text-white"
            : "bg-white text-writingMainDark"
        }
        `}
      >
        {t(choice)}
      </p>
      <p className="text-writingMainDark font-medium">{t(text)}</p>
    </div>
  );
}

export default ChoiceButton
