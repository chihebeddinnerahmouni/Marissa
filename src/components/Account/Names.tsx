import { useTranslation } from "react-i18next"

const Names = () => {
    const { t } = useTranslation()
  return (
    <div className="w-full flex flex-col gap-1">
          <p className="font-semibold">{t("name")}</p>
          <div className="names w-full flex gap-2">
              <input
                  type="text"
                  className="firstname bg-emptyInput w-[100%] p-1 rounded-[5px] border-1 border-darkGrey outline-main"
                  placeholder={t("first_name")}
              />
              <input
                  type="text"
                  className="lastname bg-emptyInput w-[100%] p-1 rounded-[5px] border-1 border-darkGrey outline-main"
                  placeholder={t("last_name")}
              />

          </div>
    </div>
  )
}

export default Names
