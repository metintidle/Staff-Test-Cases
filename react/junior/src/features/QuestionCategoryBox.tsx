// import { Checkbox } from "@mui/material";
import { Alert, Card, Checkbox, FormControlLabel, FormGroup, FormHelperText, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import GroupNames, { GroupCount } from "../context/GroupEnums";
import SubmitButton from "../components/base/ButtonSubmit";
import { responsiveSpace } from "../utils/resposive-style";

export default function QuestionCategoryBox ({ handleCheckQuestion }: any){
  const [checkedGroups, setCheckedGroups] = useState(GroupNames);
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);

  const activeGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkedGroups[event.target.name] = event.target.checked;
    setCheckedGroups({ ...checkedGroups });
    calculateGroupCount();
  };

  const calculateGroupCount = () => {
    const questionsSet = new Set<number>();
    getGroups().map(g => GroupCount[g]).every(quest => quest.every(n => questionsSet.add(n)));
    setCount(questionsSet.size);
  }

  const getGroups = () => {
    const isSelectedAll = Object.values(checkedGroups).findIndex((group, index, groups) => group === true && index === groups.length - 1);
    let groups: string[] = [];

    if (isSelectedAll > -1) {
      groups = Object.entries(checkedGroups).filter(([key, value]) => key !== "Select All").map((g) => g[0]);
    } else {
      groups = Object.entries(checkedGroups)
        .filter(([key, value]) => Boolean(value) === true ? key : null)
        .map((g) => g[0]);
    }
    return groups;
  }

  const onSubmitForm = () => {
    const anySelected = !Object.values(checkedGroups).includes(true);

    setError(() => anySelected ? 'You Should select at least 1 item' : '');

    if (!anySelected) {
      console.log(true);
      handleCheckQuestion(true);
      setCount(0);

    }
  };


  return (
    <>
      <Card sx={{ bgcolor: 'background.default', p: responsiveSpace, m: 2, borderWidth: 2, borderColor: 'grey.400' }} >
        <Typography variant="h2" mb={responsiveSpace} >
          Choose the cyber risks most relevant to your business
          <Typography display={{ sm: 'flex', xs: 'none' }} fontSize={18} color={'text.secondary'} variant="body1">
            You can make any adjustments to your cyber risk selections.
          </Typography>
        </Typography>
        <FormGroup row={true} >
          {Object.keys(GroupNames).map((name) => (
            <FormControlLabel
              key={name}
              control={<Checkbox onChange={activeGroup} name={name} color="primary" />}
              label={name}
              sx={{ color: "text.secondary", minWidth: "18%", fontSize: 1 }}
            />
          ))
          }
        </FormGroup >
        <FormHelperText error={true} >{error}</FormHelperText>
        <SubmitButton variant="outlined" onClick={onSubmitForm}>
          Take Assessment
        </SubmitButton>
      </Card >
    </>
  );
}
