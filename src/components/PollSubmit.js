import * as React from 'react';
import {ethers} from "ethers";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.onSubmit();
    setOpen(false);
  };

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
    </>
  );
}

export default PollSubmit;
