import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "@/components/help/BreadCrumb"
import rental_qsts_array from "@/assets/files/help/rental_questions"
import ArticleInThisSection from "@/components/help/ArticleInThisSection"
import Answer from "@/containers/help/Answer"
import categories from "@/assets/files/help/categories"
import LoadingLine from "@/components/ui/LoadingLine"

const HelpQuestions = () => {

    const { category, questionId } = useParams<{ category: string, questionId: string }>()
  const [questions, setQuestions] = useState<any>([])
  // const [selectedQuestion, setSelectedQuestion] = useState<string>("")
  const [loading, setLoading ] = useState<boolean>(true)
    const navigate = useNavigate()
    
    
    
  useEffect(() => { 
    if (!categories.includes(category!)) { 
      return navigate("/help")
    }

    if (questionId) {
      console.log("yesid")
      setTimeout(() => {
      setQuestions(rental_qsts_array)
        setLoading(false)
    }, 500)
    }

    console.log("here")


    if (!questionId) {
          console.log("no id")   
      setTimeout(() => { 
        setQuestions(rental_qsts_array)
        navigate(`/help/${category}/${rental_qsts_array[0].id}`)
        setLoading(false)
      }, 500)
    }
  }, [])


  // console.log(questions)

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine/>
      </div>
    )
  }
    
  return (
    <div className="w-full px-4 md:px-20 lg:px-[120px]">
      <BreadCrumb categoryName={category} />
      <div className="content w-full grid grid-cols-1 lg:grid-cols-12 lg:gap-20 lg:items-start">
        <ArticleInThisSection
        questionsArray = {questions}
        category={category}
      />
        {questionId && <Answer />}
      </div>

    </div>
  );
}

export default HelpQuestions
