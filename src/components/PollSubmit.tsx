import * as React from 'react';
import {ethers} from "ethers";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import PublicPollBoundContract
  from '../artifacts/contracts/PublicPollBound.sol/PublicPollBound.json';
import VoteCounts from "./VoteCounts";
import {pollSubmitProps} from "./pollTypes";

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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function PollSubmit(props: pollSubmitProps) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [bdMessage, setBdMessage] = React.useState("Waiting for transaction verification. Please check your wallet...");

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
    handleBackdropToggle();
    if(props.selectedVote !== null) {
      sendVote(props.selectedVote.toString());
    }
    setOpen(false);
  };

  const handleBackdropToggle = () => {
    setOpenBackdrop(!openBackdrop);
  };

  async function sendVote(vote: string) {
      const signer = web3React.library.getSigner(web3React.account);
      const pollContract = new ethers.Contract(props.instance.address, PublicPollBoundContract.abi, signer);
      try {
        const transaction = await pollContract.vote(vote);
        setBdMessage('Recording your vote...');
        await transaction.wait();
        handleBackdropToggle();
        props.onNext();
      } catch (err) {
        console.log("Error: ", err);
      }
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <Grid container spacing={3}>
          <Grid container item xs={12} justifyContent="center">
            <CircularProgress color="inherit" />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <Typography component="p">
            {bdMessage}
            </Typography>
          </Grid>
        </Grid>
      </Backdrop>

      <h3 className={classes.text}>You have chosen: <span className={classes.vote}>{props.selectedVote ? ethers.utils.parseBytes32String(props.instance.proposals[props.selectedVote]) : "Nothing"}</span></h3>
      <div className={classes.buttons}>
        <Button variant="contained"
                className={classes.button}
                onClick={props.onBack}
                disabled={open || openBackdrop}>
          Back
        </Button>
        <Button variant="contained" color="primary"
                className={classes.button}
                onClick={handleClickOpen}
                disabled={open || openBackdrop}>
          Submit
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Confirm vote
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to submit your vote for {ethers.utils.parseBytes32String(props.instance.proposals[props.selectedVote ? props.selectedVote : 0])}
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
