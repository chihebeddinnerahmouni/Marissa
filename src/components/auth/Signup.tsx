import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaRegEyeSlash } from "react-icons/fa"
import { FaRegEye } from "react-icons/fa6"
import { Link } from "react-router-dom"
import LoadingButton from "../ui/LoadingButton"


const Signup = () => {

  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

    const signup = () => {
        let isMissing = false;

        if (firstName === "") {
            setIsFirstNameMissing(true);
            isMissing = true;
        }

        if (lastName === "") {
            setIsLastNameMissing(true);
            isMissing = true;
        }

        if (email === "") {
            setIsEmailMissing(true);
            isMissing = true;
        }

        if (password === "") {
            setIsPasswordMissing(true);
            isMissing = true;
        }

        if (confirmPassword === "") {
            setIsConfirmPasswordMissing(true);
            isMissing = true;
        }

        if (password !== confirmPassword) {
            setIsPasswordNotMatch(true);
            isMissing = true;
        }

        if (phone === "") {
            setIsPhoneMissing(true);
            isMissing = true;
        }
      if (isMissing) return;
      
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState("");
    const [isFirstNameMissing, setIsFirstNameMissing] = useState(false);
    const [isLastNameMissing, setIsLastNameMissing] = useState(false);
    const [isEmailMissing, setIsEmailMissing] = useState(false);
    const [isPasswordMissing, setIsPasswordMissing] = useState(false);
    const [isPhoneMissing, setIsPhoneMissing] = useState(false);
    const [isConfirmPasswordMissing, setIsConfirmPasswordMissing] = useState(false);
    const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);


  return (
    // <div className="w-full h-full py-6 bg-white rounded-10 shadow-hardShadow flex flex-col items-center justify-center md:w-[400px] md:h-auto">
    <div className="w-full h-[100vh] py-6 bg-white  shadow-hardShadow flex flex-col items-center justify-center md:rounded-10 md:w-[400px] md:h-auto">
      <div className="all flex flex-col items-center w-[320px]">
        <p className="text-lg font-semibold text-writingMainDark">
          {t("create_account")}
        </p>

        {/* names */}
        <div className="names flex gap-2">
          <div className="first-name w-full mt-5">
            <input
              type="text"
              placeholder={t("first_name")}
              onChange={(e) => { setFirstName(e.target.value); setIsFirstNameMissing(false)} }
              className={`outline-none w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
                isFirstNameMissing ? "border-red-400" : "border-gray-300"
              }`}
            />
            {isFirstNameMissing && (
              <p className="text-[10px] mt-2 text-red-400">
                {t("enter_first_name")}
              </p>
            )}
          </div>
          <div className="last-name w-full mt-5">
            <input
              type="text"
              placeholder={t("last_name")}
              onChange={(e) => { setLastName(e.target.value);  setIsLastNameMissing(false)} }
              className={`outline-none w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
                isLastNameMissing ? "border-red-400" : "border-gray-300"
              }`}
            />
            {isLastNameMissing && (
              <p className="text-[10px] mt-2 text-red-400">
                {t("enter_last_name")}
              </p>
            )}
          </div>
        </div>

        {/* email */}
        <div className="email w-full mt-5">
          <input
            type="text"
            placeholder={t("email")}
            onChange={(e) => { setEmail(e.target.value);  setIsEmailMissing(false)} }
            className={`outline-none w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
              isEmailMissing ? "border-red-400" : "border-gray-300"
            }`}
          />
          {isEmailMissing && (
            <p className="text-[10px] mt-2 text-red-400">{t("enter_email")}</p>
          )}
        </div>

        {/* phone */}
        <div className="phone w-full mt-5">
          <input
            type="text"
            placeholder={t("phone")}
            onChange={(e) => { setPhone(e.target.value);  setIsPhoneMissing(false)} }
            className={`outline-none w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
              isPhoneMissing ? "border-red-400" : "border-gray-300"
            }`}
          />
          {isPhoneMissing && (
            <p className="text-[10px] mt-2 text-red-400">{t("enter_phone")}</p>
          )}
        </div>

        {/* password */}
        <div className="password w-full mt-5">
          <div className="passwordinput relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("password")}
              onChange={(e) => { setPassword(e.target.value);  setIsPasswordMissing(false)} }
              className={`w-full h-10 border-[1px] rounded-[5px] px-2 focus:border-none focus:outline-main ${
                isPasswordMissing ? "border-red-400" : "border-gray-300"
              }`}
            />
            <button
              className={`absolute top-[50%] translate-y-[-50%] ${
                i18n.language === "en" ? "right-3" : "left-3"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEyeSlash />
              ) : (
                <FaRegEye className="text-writingGrey" />
              )}
            </button>
          </div>
          {isPasswordMissing && (
            <p className="text-[10px] mt-2 text-red-400">
              {t("enter_password")}
            </p>
          )}
        </div>

        {/* confirm password */}
        <div className="confirm-password w-full mt-5">
          <input
            type="password"
            placeholder={t("confirm_password")}
            onChange={(e) => { setConfirmPassword(e.target.value);  setIsConfirmPasswordMissing(false), setIsPasswordNotMatch(false)} }
            className={`outline-none w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
              isConfirmPasswordMissing ? "border-red-400" : "border-gray-300"
            }`}
          />
          {isConfirmPasswordMissing && (
            <p className="text-[10px] mt-2 text-red-400">
              {t("enter_confirm_password")}
            </p>
          )}
          {isPasswordNotMatch && (
            <p className="text-[10px] mt-2 text-red-400">
              {t("password_not_match")}
            </p>
          )}
        </div>

        {/* signup button */}
        <div className="buttons flex flex-col w-full">
          <button
            className="w-full h-10 bg-main text-white rounded-[5px] mt-7 hover:bg-mainHover"
            onClick={signup}
            disabled={loading}
          >
            {loading ? <LoadingButton /> : t("signup")}
          </button>
        </div>

        {/* already */}
        <div className="login text-xs w-[370px] mt-5 flex justify-center gap-1">
          <p className="text-writingMainDark">{t("you_already_have_account")}</p>
          <Link to="/login" className="text-main font-semibold underline">
            {t("login")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup
