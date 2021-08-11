import { Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import DecentralPollContract
  from '../artifacts/contracts/DecentralPoll.sol/DecentralPoll.json';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {pollLookupProps} from "./pollTypes";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  alert: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

function PollLookup(props: pollLookupProps) {

  if (!props.w3r) {
    throw new Error('Bad Poll Lookup Config');
  }

  const web3React = props.w3r();

  const { onLookup } = props

  const [
    pollAddress,
    setPollAddress,
  ] = useState('');

  const [
    pollIsValid,
    setPollIsValid
  ] = useState(false);

  const [
    searched,
    setSearched
  ] = useState(false);

  const classes = useStyles();

  function walletConnected() {
    return web3React.active;
  }

  let fetchPoll = async function(address: string) {
    const pollContract = new ethers.Contract(address, DecentralPollContract.abi, web3React.library);
    try {
      let pollName = ethers.utils.parseBytes32String(await pollContract.getName());
      let proposals = await pollContract.getProposals();
      let startTime = new Date((await pollContract.getStartTime()).toNumber()*1000);
      let endTime = new Date((await pollContract.getEndTime()).toNumber()*1000);
      let hasPollStarted = await pollContract.hasPollStarted();
      let hasPollEnded = await pollContract.hasPollEnded();
      let voterCounts = await pollContract.getVoterCounts();
      let canVote = await pollContract.canVote(web3React.account);
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
      setPollIsValid(true);
      setSearched(true);
      return true;
    } catch (err) {
      setPollIsValid(false);
      setSearched(true);
      return false;
    }
  }

  async function handleNext() {
    const pollStatus = await fetchPoll(pollAddress);
    if (pollStatus) {
      props.onNext();
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="poll-address"
            name="poll-address"
            label={!walletConnected() ? 'Please connect a wallet' : 'Set Poll Address'}
            onChange={e => setPollAddress(e.target.value)}
            fullWidth
            disabled={!walletConnected()}
          />
        </Grid>
      </Grid>
      <div className={classes.alert}>
        {!pollIsValid && searched && <Alert severity="error">Could not find poll with that address</Alert>}
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          disabled={!pollAddress || !walletConnected()}
          color="primary"
          id="submit button"
          onClick={handleNext}
          className={classes.button}
          data-testid="step-one-button"
        >
          Search For Poll
        </Button>
      </div>
    </>
  )
}

export default PollLookup;
