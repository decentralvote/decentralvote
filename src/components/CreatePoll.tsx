import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from "@material-ui/core/Typography";

import {instanceType} from "./pollTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function CreatePoll() {

  const classes = useStyles();

  const [name, setName] = React.useState<string>("Poll Name");
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());

  const [
    pollInstance,
    setPollInstance
  ] = React.useState<instanceType>({
    address: "",
    pollName: "No Poll",
    proposals: [],
    startTime: "",
    endTime: "",
    hasPollStarted: false,
    hasPollEnded: false,
    canVote: false,
    voterCounts: []
  });




  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const handleSubmit = () => {
    setPollInstance({
      address: "1234",
      pollName: name,
      proposals: [],
      // The string formats are likely not the same at this time
      startTime: startDate.toString(),
      endTime: endDate.toString(),
      canVote: false,
      hasPollEnded: false,
      hasPollStarted: true,
      voterCounts: []})
  };

  return (
    <div>
      <br />
      <Typography align={"center"} variant={"h4"}>Create Poll</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required id="standard-required" label="Required" defaultValue="Poll Name" value={name} onChange={e => setName(e.target.value)}/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Typography variant={"h6"}>Start Time:</Typography>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
          <br />
          <Typography variant={"h6"}>End Time:</Typography>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
      <br />
      <Button variant={"contained"} color={"primary"} onClick={handleSubmit}>Submit</Button>

      <p>Poll Address: {pollInstance.address}</p>
      <p>Poll Name: {pollInstance.pollName}</p>
      <p>Poll Start Time: {pollInstance.startTime}</p>
      <p>Poll End Time: {pollInstance.endTime}</p>
    </div>
  );
};

