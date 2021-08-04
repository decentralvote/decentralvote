import { useState } from 'react';
import React from 'react';
import PollLookup from './PollLookup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PollDisplay from "./PollDisplay";
import { useWeb3React } from '@web3-react/core';
import PollSubmit from "./PollSubmit";

const steps = ['Poll Lookup', 'Poll Details', 'Submit Vote'];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  fetchButton: {
    marginTop: theme.spacing(2),
    alignContent: "center"
  }
}));

function Vote() {
  const classes = useStyles();

  const [
    pollInstance,
    setPollInstance
  ] = useState({
    address: "",
    pollName: "",
    proposals: [],
    startTime: "",
    endTime: "",
    hasPollStarted: false,
    hasPollEnded: false,
    canVote: false,
    voterCounts: []
  });

  const [activeStep, setActiveStep] = useState(0);

  const [
    selectedVote,
    setSelectedVote,
  ] = useState(null);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PollLookup w3r={useWeb3React} onLookup={setPollInstance} onNext={handleNext}/>;
      case 1:
        return <PollDisplay instance={pollInstance} vote={sendVote} onNext={handleNext} selectedVote={selectedVote} selectVote={setSelectedVote}/>;
      case 2:
        // Eventually add sendVote to onSubmit
        return <PollSubmit instance={pollInstance} selectedVote={selectedVote} onBack={handleBack} onSubmit={() => console.log(selectedVote)}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  function sendVote() {
    console.log("send vote");
  }
// call the smart contract, send a vote
// this makes a contract request, might be causing the issue
//   async function sendVote(vote) {
//     if (typeof window.ethereum !== 'undefined') {
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const pollContract = new ethers.Contract(pollInstance.address, DecentralPollContract.abi, signer);
//       try {
//         const transaction = await pollContract.vote(vote);
//         await transaction.wait();
//       } catch (err) {
//         console.log("Error: ", err);
//       }
//     }
//   }



  // function BottomButtons() {
  //   return <div className={classes.buttons}>
  //     {activeStep !== 0 && (
  //       <Button onClick={handleBack} className={classes.button}>
  //         Back
  //       </Button>
  //     )}
  //     <Button
  //       variant="contained"
  //       color="primary"
  //       onClick={handleNext}
  //       className={classes.button}
  //     >
  //       {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
  //     </Button>
  //   </div>;
  // }

  return (
    <>
      <Typography component="h1" variant="h4" align="center">
        Vote
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
          </>
        ) : (
          <>
              {getStepContent(activeStep)}
            {/*<BottomButtons />*/}
          </>
        )}
      </>
    </>
  );

  // return (
  //   <Container maxWidth="sm">
  //     <div className={classes.paper}>
  //       <form className={classes.form} noValidate>
  //       <Grid container spacing={2}>
  //           <Grid item xs={12}>
  //             <TextField
  //               variant="outlined"
  //               required
  //               fullWidth
  //               id="pollAddress"
  //               label="Poll Address"
  //               name="pollAddress"
  //               value={pollAddress}
  //               onChange={e => setPollAddress(e.target.value)}
  //             />
  //           </Grid>
  //         </Grid>
  //         <Button
  //           fullWidth
  //           variant="contained"
  //           color="primary"
  //           className={classes.submit}
  //           onClick={fetchPoll}
  //         >
  //           Fetch Poll
  //         </Button>
  //       </form>
  //       { details }
  //     </div>
  //   </Container>
  // );
}

export default Vote;
