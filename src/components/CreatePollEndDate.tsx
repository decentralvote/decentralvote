import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import { createPollEndDateProps } from './pollTypes';

export default function CreatePollEndDate(props: createPollEndDateProps) {


  return (
    <Grid container justifyContent="space-around">
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={props.date}
        onChange={props.setDate}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="Time picker"
        value={props.date}
        onChange={props.setDate}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </Grid>
  );
};
