import { useTranslation } from "react-i18next";
import UserMenuButton from "./UserMenuButton";
import { useEffect, useState } from "react";

const Right = () => {
  const { i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("toggleChecked") === "true"
  );

  useEffect(() => {
    const newLang = isChecked ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  }, [isChecked, i18n]);

  const changeLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    localStorage.setItem("toggleChecked", String(e.target.checked));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="language flex items-center gap-2">
        <label className="toggle-btn">
          <input
            type="checkbox"
            onChange={changeLanguage}
            checked={isChecked}
          />
          <span className="toggle-text"></span>
        </label>
      </div>
      <UserMenuButton/>
    </div>
  );
};

export default Right
