import { useTranslation } from "react-i18next";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";




const ArticleInThisSection = ({category, questions}:any) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  const { questionId } = useParams<{ questionId: string }>()
  const [isListOpen, setIsListOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsListOpen(!isMobile);
  }, [isMobile]);

 

  return (
    <div
      className={`relative w-full py-2 mt-10 border-t border-main px-2 lg:col-span-4 lg:px-0 lg:border-none ${
        !isListOpen && "border-b-1"
      }`}
    >
      <div
        className="listHeader w-full flex items-center justify-between cursor-pointer lg:cursor-default"
        onClick={() => isMobile && setIsListOpen(!isListOpen)}
      >
        <p>{t("articles_on_this_section")}</p>
        <div className="text-[16px] text-writingMainDark lg:hidden">
          {isListOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>

      {/* the menu */}
      {isListOpen && (
        <div
          className={`menu w-full bg-white top-[40px] py-2 flex flex-col gap-1 lg:border-none ${
            isListOpen && "border-b-1 border-main"
          }`}
        >
          {questions.map((question: any, index: number) => (
            <div
              key={index}
              onClickCapture={() => {
                navigate(`/help/${category}/${question.id}`)
              } }
              className={`menu-item p-2 rounded-10 cursor-pointer text-sm font-semibold ${
                // selectedQuestion === question.id ? "bg-main text-white" : ""
                Number(questionId)  === question.id ? "bg-main text-white" : ""
              }`}
            >
              {t(question.question)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleInThisSection;



