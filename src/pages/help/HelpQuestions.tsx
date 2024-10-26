import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BreadCrumb from "@/components/help/BreadCrumb"
import ArticleInThisSection from "@/components/help/ArticleInThisSection"
import Answer from "@/containers/help/Answer"
import categories from "@/assets/files/help/categories"





const HelpQuestions = () => {

  const { category, questionId } = useParams<{ category: string, questionId: string }>()


    const navigate = useNavigate()
    

    
  useEffect(() => { 
    if (!categories.includes(category!)) { 
      return navigate("/help")
    }
  }, [])





    
  return (
    <div className="w-full px-4 md:px-20 lg:px-[120px]">
      <BreadCrumb categoryName={category} />
      <div className="content w-full grid grid-cols-1 lg:grid-cols-12 lg:gap-20 lg:items-start">
        <ArticleInThisSection
          category={category}
        />
        {questionId && <Answer/>}
      </div>
    </div>
  );
}

export default HelpQuestions
