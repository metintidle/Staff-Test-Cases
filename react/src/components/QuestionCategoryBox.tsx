// import { Checkbox } from "@mui/material";
import { Card, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { CategoryNames, QuestionCount } from '../context/categoryInfo';
import SubmitButton from './shared/form/ButtonSubmit';

export default function QuestionCategoryBox({ showQuestionList }: any) {
  const onSubmitForm = () => {
    showQuestionList(true);
  };

  return (
    <>
      <Card sx={{ bgcolor: 'background.default', p: { md: 6, xs: 3 }, m: 2, borderWidth: 2, borderColor: 'grey.400' }}>
        <Typography variant="h5" mb={{ md: 6, xs: 3 }}>
          Choose the cyber risks most relevant to your business
          <Typography display={{ sm: 'flex', xs: 'none' }} fontSize={18} color={'text.secondary'} variant="body1">
            You can make any adjustments to your cyber risk selections.
          </Typography>
        </Typography>
        <FormGroup row={true}>
          {Object.keys(CategoryNames).map((name) => (
            <FormControlLabel key={name} control={<Checkbox name={name} color="primary" />} label={name} sx={{ color: 'text.secondary', minWidth: '18%', fontSize: 1 }} />
          ))}
        </FormGroup>
        <SubmitButton variant="outlined" onClick={onSubmitForm}>
          Take Assessment
        </SubmitButton>
      </Card>
    </>
  );
}
