import React, {useState} from 'react';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import VoteCounts from "./VoteCounts";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {ethers} from "ethers";
import {Alert} from "@material-ui/lab";

function PollDisplay(props) {

  const [
    selectedVote,
    setSelectedVote,
  ] = useState(null);


  function ProposalList(props) {
    const proposals = props.proposals;
    return proposals.map((proposal, index) =>
      <FormControlLabel value={index.toString()}
                        control={<Radio color={"default"}/>}
                        label={ethers.utils.parseBytes32String(proposal)}/>
    );
  }

  const handleChange = (e) => {
    setSelectedVote(e.target.value);
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

        {props.instance.canVote &&
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend">Proposals</FormLabel>
            <RadioGroup
              aria-label="proposals"
              name="proposals"
              value={selectedVote}
              onChange={handleChange}>
              <ProposalList proposals={props.instance.proposals}/>
              <Button variant="contained" color="primary" onClick={props.onNext}>
                Vote!
              </Button>
            </RadioGroup>
          </FormControl>
          <VoteCounts counts={props.instance.voterCounts}
                      proposals={props.instance.proposals}/>
        </>
        }
      </>
      }
    </>
  );
}

export default PollDisplay;
