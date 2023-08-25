import { useRef, useState } from "react";
import QuestionCategoryBox from "../features/QuestionCategoryBox";
import QuestionList from "../features/QuestionList";

const App = () => {
  const [isShowQuestion, setIsShowQuestion] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleQuestion = (isActive: boolean) => {
    setIsShowQuestion(isActive);
  }
  return (
    <>
      <QuestionCategoryBox handleCheckQuestion={handleQuestion}></QuestionCategoryBox>
      <div ref={listRef}>
        <QuestionList isVisible={isShowQuestion} ></QuestionList>
      </div>

    </>
  )
}

export default App;