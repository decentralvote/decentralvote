import {Grid, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {ethers} from "ethers";
import DecentralPollContract
  from "../artifacts/contracts/DecentralPoll.sol/DecentralPoll.json";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

function PollLookup(props) {

  const { onLookup } = props

  const [
    pollAddress,
    setPollAddress,
  ] = useState('');

  const classes = useStyles();

  // request access to the user's MetaMask account
  async function fetchPoll(address) {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const pollContract = new ethers.Contract(address, DecentralPollContract.abi, provider);
      try {
        let pollName = ethers.utils.parseBytes32String(await pollContract.getName());
        let proposals = await pollContract.getProposals();
        let startTime = new Date((await pollContract.getStartTime()).toNumber()*1000);
        let endTime = new Date((await pollContract.getEndTime()).toNumber()*1000);
        let hasPollStarted = await pollContract.hasPollStarted();
        let hasPollEnded = await pollContract.hasPollEnded();
        let voterCounts = await pollContract.getVoterCounts();
        let canVote = true; //await pollContract.canVote();
        let instanceData = {
          address: pollAddress,
          pollName: pollName,
          proposals: proposals,
          startTime: startTime,
          endTime: endTime,
          hasPollStarted: hasPollStarted,
          hasPollEnded: hasPollEnded,
          canVote: canVote,
          voterCounts: voterCounts
        };
        onLookup(instanceData);
        console.log('instance: ', instanceData);
      } catch (err) {
        console.log("Error: ", err);
      }
    }

  }

  function handleNext() {
    fetchPoll(pollAddress);
    props.onNext();
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="poll-address"
            name="poll-address"
            label="Set Poll Address"
            onChange={e => setPollAddress(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
                variant="contained"
                color="primary"
                label="submit button"
                id="submit button"
                onClick={handleNext}
                className={classes.button}
              >
          Next
        </Button>
      </div>
    </>
  )
}

export default PollLookup;
