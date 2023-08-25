'use client'
import { useRef, useState } from "react";
import GroupBox from "../features/QuestionCategoryBox";
import QuestionList from "../features/QuestionList";

const FirstStep = () => {
  const [isShowQuestion, setIsShowQuestion] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleQuestion = (isActive: boolean) => {
    setIsShowQuestion(isActive);
  }
  return (
    <>
      <GroupBox handleCheckQuestion={handleQuestion}></GroupBox>
      <div ref={listRef}>
        <QuestionList isVisible={isShowQuestion} ></QuestionList>
      </div>

    </>
  )
}

export default FirstStep;