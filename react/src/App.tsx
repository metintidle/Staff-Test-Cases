import { useRef, useState } from 'react';
import QuestionCategoryBox from './components/QuestionCategoryBox';
import QuestionList from './components/QuestionList';

const App = () => {
  //state to be initialized when loading the question list
  const [isShowQuestion, setIsShowQuestion] = useState(false);

  //reference to the div that holds the question list
  const listRef = useRef<HTMLDivElement | null>(null);

  //create a new QuestionList
  const handleQuestion = (isActive: boolean) => {
    setIsShowQuestion(isActive); //FIXME: update on change category
  };

  return (
    <>
      <QuestionCategoryBox showQuestionList={handleQuestion}></QuestionCategoryBox>
      <div ref={listRef}>
        <QuestionList isVisible={isShowQuestion}></QuestionList>
      </div>
    </>
  );
};

export default App;
