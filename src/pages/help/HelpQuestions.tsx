import { useParams } from "react-router-dom"
import {
  useEffect,
  // useContext
} from "react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "@/components/help/BreadCrumb"
import ArticleInThisSection from "@/components/help/ArticleInThisSection"
import Answer from "@/containers/help/Answer"
// import { HelpContext } from "@/Layout/HelpLayout";
import axios from "axios"
import LoadingLine from "@/components/ui/LoadingLine"
import Swal from "sweetalert2"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { axios_error_handler } from "@/functions/axios_error_handler";



const url = import.meta.env.VITE_SERVER_URL_HELP as string
const fetshQsts = async (categoryId: string) => {
  const res = await axios.get(`${url}/categories/${categoryId}/questions`);
  return res.data;
};


const HelpQuestions = () => {

  const { category, questionId } = useParams<{ category: string, questionId: string }>()
  // const { categoryName } = useContext(HelpContext)
  const { t } = useTranslation()

  const navigate = useNavigate()

  const {data: questions, isLoading, error} = useQuery({
    queryKey: ["getHelpQuestions", category],
    queryFn: () => fetshQsts(category!)
  })

  useEffect(() => {
    if (error) {
      const axiosError = error as any
      if (
        axiosError.response.data.message ===
        "No questions found for this category"
      ) {
        Swal.fire({
          title: t("ops"),
          text: t("no_questions_found_for_this_category"),
          showCancelButton: false,
        });
      } else {
        axios_error_handler(error, t);
      }
    }
  }, [error])
  
  useEffect(() => { 
    if (questions && questions.length > 0) navigate(`/help/${category}/${questions[0].id}`)
  }, [questions])

  if (error) return <div className="w-full h-screen"></div>
  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }

    
  return (
    <div className="w-full px-4 md:px-20 lg:px-[120px]">
      <BreadCrumb categoryName="hj" />
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
