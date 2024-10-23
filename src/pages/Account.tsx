import ProfilePic from "@/components/Account/ProfilePic"
import Names from "@/components/Account/Names"
import Email from "@/components/Account/Email"
import Password from "@/components/Account/Password"
import Phone from "@/components/Account/Phone"
import { useTranslation } from "react-i18next"


const Account = () => {
  const { t } = useTranslation()
  return (
    <div className="w-full px-4 flex justify-center">
      <div className="content w-full mt-[100px] flex flex-col gap-4 pb-10 md:gap-6 md:w-[450px] lg:w-[550px] lg:mt-[170px]">
        <ProfilePic />
        <Names />
        <Email />
        <Password />
        <Phone />
        <button className="w-[80px] h-[40px] bg-main rounded-[5px] text-white hover:bg-mainHover">
          {t("save")}
        </button>
      </div>
    </div>
  )
}

export default Account
