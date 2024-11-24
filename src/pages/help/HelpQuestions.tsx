import { useParams } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "@/components/help/BreadCrumb"
import ArticleInThisSection from "@/components/help/ArticleInThisSection"
import Answer from "@/containers/help/Answer"
// import categories from "@/assets/files/help/categories"
import { HelpContext } from "@/Layout/HelpLayout";
import axios from "axios"
import LoadingLine from "@/components/ui/LoadingLine"
import Swal from "sweetalert2"
import { useTranslation } from "react-i18next"






const HelpQuestions = () => {

  const { category, questionId } = useParams<{ category: string, questionId: string }>()
  const { categoryName } = useContext(HelpContext)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState<any>([])
  const { t } = useTranslation()

  const navigate = useNavigate()
  
  useEffect(() => { 

    axios
      .get(`${import.meta.env.VITE_SERVER_URL_HELP}/categories/${category}/questions`)
      .then((res) => {
        // console.log(res.data);
        setQuestions(res.data);
        setLoading(false);
        if (res.data.length > 0) return navigate(`/help/${category}/${res.data[0].id}`);
       
      })
      .catch((err) => {
        if (
          err.response.data.message === "No questions found for this category"
        ) {
          Swal.fire({
            title: t("ops"),
            text: t("no_questions_found_for_this_category"),
            customClass: {
              confirmButton: "custom-confirm-button",
            }
          }).then(() => {
            navigate("/help");
          })
        }
        if (err.message === "Network Error") {
          Swal.fire({
            icon: "error",
            title: t("network_error"),
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          }).then(() => {
            window.location.reload();
          })
        }
          
      });

  }, [])
    

    

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine/>
      </div>
    )
  }





    
  return (
    <div className="w-full px-4 md:px-20 lg:px-[120px]">
      <BreadCrumb categoryName={categoryName} />
      <div className="content w-full grid grid-cols-1 lg:grid-cols-12 lg:gap-20 lg:items-start">
        <ArticleInThisSection
          category={category}
          questions={questions}
        />
        {questionId && <Answer questions={questions} />}
      </div>
    </div>
  );
}

export default HelpQuestions
