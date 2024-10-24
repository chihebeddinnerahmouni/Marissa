import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "@/components/help/BreadCrumb"
import rental_qsts_array from "@/assets/files/help/rental_questions"
import ArticleInThisSection from "@/components/help/ArticleInThisSection"
import Answer from "@/containers/help/Answer"
import categories from "@/assets/files/help/categories"


const HelpQuestions = () => {

    const { category, questionId } = useParams<{ category: string, questionId: string }>()
    const [answer, setAnswer] = useState<string>("")
    const [selectedQuestion, setSelectedQuestion] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => { 
       const check =  !categories.includes(category!)
        if (check) {
            navigate("/help")
            return
        }
    }, [])

    useEffect(() => { 
        const question = rental_qsts_array.find(q => String(q.id) === questionId);
        if (question) {
            setAnswer(question.answer)
            setSelectedQuestion(question.question)
        } else {
            navigate(`/help/${category}/${rental_qsts_array[0].id}`)
            return
        }
    }, [questionId])

    
  return (
    <div className="w-full px-4 md:px-20">
      <BreadCrumb categoryName={category} />
      <ArticleInThisSection
        selectedQuestion={selectedQuestion}
        questionsArray = {rental_qsts_array}
        category={category}
      />
      <Answer answer={answer} />
    </div>
  );
}

export default HelpQuestions
