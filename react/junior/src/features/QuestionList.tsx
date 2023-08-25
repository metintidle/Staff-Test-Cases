import { Alert, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import AssistantService from "../services/AssistantService";
import IQuestion, { IAnswer } from "../context/AssistantTypes";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DataService from "../services/DataService";
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import ErrorPopup from "../components/base/ErrorPopup";
import MainButton from "../components/base/ButtonMain";``


const QuestionList = ({ isVisible = false }) => {
  const [items, setItems] = useState<IQuestion[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const assService = new AssistantService();
    setItems(() => assService.getQuestionsWithOptions());
  }, [isVisible]);

  const submitForm = () => {
      setShowError(true);
  }

  const saveAnswer = (answer: IAnswer) => {
    setAnswers([
      ...answers.filter((a) => a.questionId !== answer.questionId),
      answer
    ]);
  }

  if (!isVisible) return;

  return (
    <Paper elevation={0} sx={{ my: { md: 4, sm: 1 }, backgroundColor: 'white' }}>
      {items.map((quest, number, a) => (
        <FormControl key={number} fullWidth variant="standard" sx={{ m: { md: 2, sm: 1 }, mb: { md: 3, xs: 3 } }} >
          <FormLabel sx={{ color: "text.secondary", mb: 1, display: 'flex' }} ><LiveHelpRoundedIcon /> {quest.title}</FormLabel>
          <RadioGroup
            row
            sx={{ flexDirection: { md: 'row', xs: 'column' }, ml: { md: 0, xs: '1.2rem' } }}
            name={'question_' + quest.id}
          >
            {quest.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.title}
                control={<Radio onChange={(e) => saveAnswer({ optionTitle: option.title, questionId: quest.id, optionId: index })} />}
                label={option.title}
                sx={{ color: "text.primary", fontWeight: 700, mr: { lg: 6, md: 3 }, fontSize: { xs: '1.3rem' } }}
              />

            ), this)}

          </RadioGroup>
        </FormControl>
      ), this)}
      <Grid container spacing={4}>
        <Grid >
          <Alert icon={false} sx={{ justifyContent: "center", color: 'primary', width: { sm: '420px', xs: '90%' }, py: 1, px: 3, borderRadius: 25 }} severity="info">
            <Typography color={'primary'} fontSize={{ xs: '0.9rem', lg: '1.1rem' }} sx={{ fontWeight: { sm: 300, md: 500 } }} padding={0} lineHeight={1}>Note: All questions must be completed to proceed.
            </Typography>
          </Alert>
        </Grid>
        <Grid  sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <MainButton onClick={submitForm} >Get Your Results</MainButton>
        </Grid>
      </Grid>
      <ErrorPopup isOpen={showError} width={300}>
        Please make sure all questions are completed to proceed.
      </ErrorPopup>
    </Paper >
  )

}

export default QuestionList;

