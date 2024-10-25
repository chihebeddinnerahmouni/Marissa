import React from 'react';
import { useTranslation } from 'react-i18next';

interface AnswerProps {
    answer: any;
    question: string;
}

const Answer: React.FC<AnswerProps> = ({ answer, question }) => {

    const { t } = useTranslation();


    return (
        <div className="mt-10 w-full text-center lg:col-span-8">
          <h1 className="text-2xl font-medium text-writingMainDark">{t(question)}</h1>
          <div className='mt-3' dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
    );
};

export default Answer;