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

function PollDisplay(props) {

  const [
    selectedVote,
    setSelectedVote,
  ] = useState(null);


  function ProposalList(props) {
    const proposals = props.proposals;
    return proposals.map((proposal, index) =>
      <FormControlLabel value={index} control={<Radio />} label={ethers.utils.parseBytes32String(proposal)} />
    );
  }

  return (
    <div>
      <Paper variant="outlined" style={{ padding: "16px" }}>
        <Typography component="h2" variant="h6">
          Poll Name
        </Typography>
        <Typography component="h3" variant="h6">
          {props.instance.pollName}
        </Typography>
        <Typography component="h2" variant="h6">
          Start Time
        </Typography>
        <Typography component="h3" variant="h6">
          {props.instance.startTime.toString()}
        </Typography>
        <Typography component="h2" variant="h6">
          End Time
        </Typography>
        <Typography component="h3" variant="h6">
          {props.instance.endTime.toString()}
        </Typography>
      </Paper>
      <h3>
        Has Started?
        {props.instance.hasPollStarted ? " Yes" : " No"}
      </h3>
      <h3>
        Has Ended?
        {props.instance.hasPollEnded ? " Yes" : " No"}
      </h3>
      <h3>Can Vote: {props.instance.canVote ? " Yes" : " No"}</h3>

      <FormControl component="fieldset">
        <FormLabel component="legend">Proposals</FormLabel>
        <RadioGroup
          aria-label="proposals"
          name="proposals"
          value={selectedVote}
          onChange={e => setSelectedVote(e.target.value)}>
          <ProposalList proposals={props.instance.proposals} />
        </RadioGroup>
      </FormControl>
      <h3>You chose: {selectedVote}</h3>
      <Button variant="contained" color="primary">
        Vote!
      </Button>
      <VoteCounts counts={props.instance.voterCounts} proposals={props.instance.proposals} />
    </div>
  );
}

export default PollDisplay;
