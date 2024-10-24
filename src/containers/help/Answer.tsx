import React from 'react';

interface AnswerProps {
    answer: any;
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
    return (
        <div className="mt-10 w-full text-center">
                <div dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
    );
};

export default Answer;