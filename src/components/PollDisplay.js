import React from 'react';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {ethers} from "ethers";
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));


function PollDisplay(props) {

  const classes = useStyles();

  function ProposalList(props) {
    const proposals = props.proposals;
    return proposals.map((proposal, index) =>
      <FormControlLabel value={index.toString()}
                        control={<Radio color={"default"}/>}
                        label={ethers.utils.parseBytes32String(proposal)}/>
    );
  }

  const valid = () => {
    return props.instance.canVote && !props.instance.hasPollEnded;
  }

  const handleChange = (e) => {
    props.selectVote(e.target.value);
  }
  return (
    <>
      {!props.instance.canVote &&
      <Alert severity={"error"}>You are not eligible to vote in this
        poll.</Alert>
      }
      {props.instance.canVote &&
      <>
        <h1>{props.instance.pollName}</h1>
        <h3
          style={{color: !props.instance.hasPollEnded ? "green" : "red"}}>{!props.instance.hasPollEnded ? "Active" : "Ended"}</h3>
        <>
          <h4>Started: {props.instance.startTime.toString()}</h4>
          <h4>{!props.instance.hasPollEnded ? "Ends" : "Ended"}: {props.instance.endTime.toString()}</h4>
        </>

        {valid() &&
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend">Proposals</FormLabel>
            <RadioGroup
              aria-label="proposals"
              name="proposals"
              value={props.selectedVote}
              onChange={handleChange}>
              <ProposalList proposals={props.instance.proposals}/>
            </RadioGroup>
          </FormControl>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary"
                    disabled={!props.selectedVote}
                    className={classes.button}
                    onClick={props.onNext}>
              Next Step
            </Button>
          </div>
        </>
        }
      </>
      }
    </>
  );
}

export default PollDisplay;
