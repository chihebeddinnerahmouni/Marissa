import {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import rental_qsts_array from "@/assets/files/help/rental_questions";
import { useParams } from "react-router-dom";
import LoadingLine from '@/components/ui/LoadingLine';


const Answer = () => {

    const { t } = useTranslation();
    const { questionId } = useParams<{ questionId: string }>()
    const [answer, setAnswer] = useState<string>("")
    const [question, setQuestion] = useState<string>("")
    const [loading, setLoading] = useState(true)


    useEffect(() => { 
     setLoading(true)
        setTimeout(() => { 
            const question = rental_qsts_array.find(q => String(q.id) === questionId);
            setQuestion(question!.question)
            setAnswer(question!.answer)
            setLoading(false)
        }, 1000)
    }, [questionId])


    if (loading) {
        return (
            <div className="w-full h-screen lg:col-span-8 lg:h-40">
               <LoadingLine />
            </div>
        )
    }


    return (
        <div className="mt-10 w-full text-center lg:col-span-8">
          <h1 className="text-2xl font-medium text-writingMainDark">{t(question)}</h1>
          <div className='mt-3' dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
    );
};

export default Answer;