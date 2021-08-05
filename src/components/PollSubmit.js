import * as React from 'react';
import {ethers} from "ethers";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DecentralPollContract
  from '../artifacts/contracts/DecentralPoll.sol/DecentralPoll.json';
import VoteCounts from "./VoteCounts";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  text: {
    textAlign: "center",
  },
  vote: {
    color: "green",
    fontSize: "larger",
  }
}));


function PollSubmit(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  if (!props.w3r) {
    throw new Error('Bad Poll Lookup Config');
  }

  const web3React = props.w3r();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    sendVote(props.selectedVote.toString());
    setOpen(false);
  };

  async function sendVote(vote) {
      const signer = web3React.library.getSigner(web3React.account);
      const pollContract = new ethers.Contract(props.instance.address, DecentralPollContract.abi, signer);
      try {
        console.log()
        const transaction = await pollContract.vote(vote);
        await transaction.wait();
      } catch (err) {
        console.log("Error: ", err);
      }
  }


  return (
    <>
      <h3 className={classes.text}>You have chosen: <span className={classes.vote}>{props.selectedVote ? ethers.utils.parseBytes32String(props.instance.proposals[props.selectedVote]) : "Nothing"}</span></h3>
      <div className={classes.buttons}>
        <Button variant="contained"
                className={classes.button}
                onClick={props.onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary"
                className={classes.button}
                onClick={handleClickOpen}>
          Submit
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm vote"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to submit your vote for {ethers.utils.parseBytes32String(props.instance.proposals[props.selectedVote])}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={handleSubmit} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <VoteCounts instance={props.instance}/>
    </>
  );
}

export default PollSubmit;
