import { Link } from 'react-router-dom'
import { BsInbox } from 'react-icons/bs'
import { IoBoatSharp } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import Language from './Mobile/Language'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { CiSettings } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'


const OnlineDropList = () => {

    const { t } = useTranslation();

    return (
      <>
        {/* user */}
        <div className="user flex items-center gap-2">
          <img
            src="https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
            alt="profile, picture"
            className="w-[35px] h-[35px] object-cover object-center rounded-50"
          />
          <p className="text-sm text-writingMainDark font-medium">
            Chiheb Rahmouni
          </p>
        </div>

        <hr className="my-3" />

        <Language />

        <hr className="my-3 lg:hidden" />

        <Link
          to={"/inbox"}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <BsInbox className="text-[20px]" />
          <p>{t("inbox")}</p>
        </Link>

        <hr className="my-3" />

        <Link
          to={"/boats-list/who-are-you"}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <IoBoatSharp className="text-[20px]" />
          <p>{t("list_your_boats")}</p>
        </Link>

        <hr className="my-3" />

        <Link
          to={"/account"}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <CiSettings className="text-[20px]" />
          <p>{t("account")}</p>
        </Link>

        <hr className="my-3" />

        <Link
          to={"/help"}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <IoIosHelpCircleOutline className="text-[20px]" />
          <span>{t("help")}</span>
        </Link>

        <hr className="my-3" />

        <Link
          to={"/logout"}
          className="w-full flex items-center gap-2 text-writingMainDark"
        >
          <IoIosLogOut className="text-[20px]" />
          <span>{t("logout")}</span>
        </Link>
      </>
    );
}

export default OnlineDropList
