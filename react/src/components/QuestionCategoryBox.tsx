// import { Checkbox } from "@mui/material";
import { Card, Checkbox, FormControlLabel, FormGroup, FormHelperText, Typography } from '@mui/material';
import { useState } from 'react';
import { CategoryNames, QuestionCount } from '../context/categoryInfo';
import SubmitButton from './shared/base/ButtonSubmit';

export default function QuestionCategoryBox({ showQuestionList }: any) {
  const [selectedCatagories, setSelectedCatagories] = useState(CategoryNames);
  const [error, setError] = useState('');

  //determine the number of questions in the selected groups
  const [count, setCount] = useState(0);

  //
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectedCatagories[event.target.name] = event.target.checked;
    setSelectedCatagories({ ...selectedCatagories });
    getQuestionCount();
  };

  const onSubmitForm = () => {
    const anySelected = !Object.values(selectedCatagories).includes(true);

    setError(() => (anySelected ? 'You Should select at least 1 item' : ''));

    if (!anySelected) {
      showQuestionList(true);
      setCount(0);
    }
  };

  const getQuestionCount = () => {
    const questionsSet = new Set<number>();
    getCategory()
      .map((g) => QuestionCount[g])
      .every((quest) => quest.every((n) => questionsSet.add(n)));
    setCount(questionsSet.size);
  };

  const getCategory = () => {
    const isSelectedAll = Object.values(selectedCatagories).findIndex((group, index, groups) => group === true && index === groups.length - 1);
    let groups: string[] = [];

    if (isSelectedAll > -1) {
      groups = Object.entries(selectedCatagories)
        .filter(([key, value]) => key !== 'Select All')
        .map((g) => g[0]);
    } else {
      groups = Object.entries(selectedCatagories)
        .filter(([key, value]) => (Boolean(value) === true ? key : null))
        .map((g) => g[0]);
    }
    return groups;
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
            <FormControlLabel key={name} control={<Checkbox onChange={handleCheckbox} name={name} color="primary" />} label={name} sx={{ color: 'text.secondary', minWidth: '18%', fontSize: 1 }} />
          ))}
        </FormGroup>
        <FormHelperText error={true}>{error}</FormHelperText>
        <SubmitButton variant="outlined" onClick={onSubmitForm}>
          Take Assessment
        </SubmitButton>
      </Card>
    </>
  );
}
