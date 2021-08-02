import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import VoteCounts from "./VoteCounts";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
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
      <FormControlLabel checked={selectedVote === index} value={selectedVote} onChange={e => setSelectedVote(e.target.checked)} value={index} control={<Radio />} label={ethers.utils.parseBytes32String(proposal)} />
    );

  return (
    <div>
      {!props.instance.canVote &&
        <Alert severity={"error"}>You are not eligible to vote in this poll.</Alert>
      }
      {props.instance.canVote &&
        <div>
          <h1>{props.instance.pollName}</h1>
          <h3 style={{color: !props.instance.hasPollEnded ? "green" : "red" }}>{!props.instance.hasPollEnded ? "Active" : "Ended"}</h3>

          <FormControl component="fieldset">
            <h2>Proposals:</h2>
            <RadioGroup
              aria-label="proposals"
              name="proposals">
              <ProposalList proposals={props.instance.proposals} />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" color="primary">
            Vote!
          </Button>
          <VoteCounts counts={props.instance.voterCounts} proposals={props.instance.proposals} />
        </div>
      }
    </div>
  );
}

export default PollDisplay;
