import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup } from '@mui/material';
import DataService from '../services/data-service';
import IQuestion, { IAnswer } from '../context/questionInfo';
import { useEffect, useState } from 'react';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import MainButton from './shared/form/ButtonMain';

const QuestionList = ({ isVisible = false }) => {
  const [items, setItems] = useState<IQuestion[]>([]);

  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setItems(() => new DataService().getQuestions());
  }, [isVisible]);

  const submitForm = () => {
    setShowError(true);
  };

  const saveAnswer = (answer: IAnswer) => {
    setAnswers([...answers.filter((a) => a.questionId !== answer.questionId), answer]);
  };

  if (!isVisible) return;

  return (
    <Paper elevation={0} sx={{ my: { md: 4, sm: 1 }, backgroundColor: 'white' }}>
      {items.map(
        (quest, number, a) => (
          <FormControl key={number} fullWidth variant="standard" sx={{ m: { md: 2, sm: 1 }, mb: { md: 3, xs: 3 } }}>
            <FormLabel sx={{ color: 'text.secondary', mb: 1, display: 'flex' }}>
              <LiveHelpRoundedIcon /> {quest.title}
            </FormLabel>
            <RadioGroup row sx={{ flexDirection: { md: 'row', xs: 'column' }, ml: { md: 0, xs: '1.2rem' } }} name={'question_' + quest.id}>
              {quest.options.map(
                (option, index) => (
                  <FormControlLabel key={index} value={option.title} control={<Radio onChange={(e) => saveAnswer({ optionTitle: option.title, questionId: quest.id, optionId: index })} />} label={option.title} sx={{ color: 'text.primary', fontWeight: 700, mr: { lg: 6, md: 3 }, fontSize: { xs: '1.3rem' } }} />
                ),
                this
              )}
            </RadioGroup>
          </FormControl>
        ),
        this
      )}
      <MainButton onClick={submitForm}>Get Your Results</MainButton>
    </Paper>
  );
};

export default QuestionList;
