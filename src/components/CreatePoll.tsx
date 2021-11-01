import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Grid, TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Typography from "@material-ui/core/Typography";
import ProposalsList from "./ProposalsList";
import {BigNumber, ethers} from 'ethers';
import PublicPollBoundContract
  from '../artifacts/contracts/PublicPollBound.sol/PublicPollBound.json';
import CreatePollDate from "./CreatePollDate";


const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));


interface createPollProps {
  w3r: any,
}

export default function CreatePoll(props: createPollProps) {

  const classes = useStyles();

  const [name, setName] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [proposals, setProposals] = React.useState([]);
  const [deployedAddress, setDeployedAddress] = React.useState("");
  const web3React = props.w3r();


  const handleSubmit = async () => {
    await createPoll();
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleProposalChange = (list: any) => {
    setProposals(list);
  };


  const createPoll = async () => {
    // Membership Protocol Addresses
    const protocolAddresses: never[] = [];

    // Proposal Name Array
    const proposalNames = proposals.map((value) => { return ethers.utils.formatBytes32String(value)});

    // Voter Base Logic
    const voterBaseLogic = ethers.utils.formatBytes32String("Default Voting");

    // Poll Name
    const pollName = ethers.utils.formatBytes32String(name);

    // Poll Type
    const pollType = ethers.utils.formatBytes32String("One Person One Vote");


    // Duration
    const start = BigNumber.from(startDate.getTime());
    const end = BigNumber.from(endDate.getTime());
    const duration: BigNumber = end.sub(start).div(1000);

    // Start Time
    const startTime = start.div(1000);

    // We get the contract to deploy
    const signer = web3React.library.getSigner(web3React.account);
    const pollContract = new ethers.ContractFactory(PublicPollBoundContract.abi, PublicPollBoundContract.bytecode, signer);

    const PublicPoll = await pollContract.deploy(
      protocolAddresses,
      proposalNames,
      voterBaseLogic,
      pollName,
      pollType,
      startTime,
      duration
    );

    await PublicPoll.deployed();
    setDeployedAddress(PublicPoll.address);
  }

  return (
    <>
      {!web3React.active && <Typography align={"center"} variant={"h5"}>Connect wallet to create poll</Typography>}

      {web3React.active && <>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography align={"center"} component="h1" variant={"h4"}>Create Poll</Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField required fullWidth id="standard-required" label="Poll name" value={name} onChange={e => setName(e.target.value)}/>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Typography variant={"h6"}>Start Time:</Typography>
                {startDate.getTime()}
                <CreatePollDate setDate={handleStartDateChange} date={startDate}/>
                <Typography variant={"h6"}>End Time:</Typography>
                {endDate.getTime()}
                <CreatePollDate setDate={handleEndDateChange} date={endDate}/>
                <Typography align={"left"} variant={"h6"}>Add Proposals:</Typography>
                <ProposalsList proposals={proposals} setProposals={handleProposalChange} />
              </MuiPickersUtilsProvider>
            </form>
            <div className={classes.buttons}>
              <Button className={classes.button} variant={"contained"} color={"primary"} onClick={handleSubmit}>Create Poll</Button>
            </div>
            {deployedAddress && <Typography variant={"h6"}>Your poll address is: <span color={"green"}>{deployedAddress}</span></Typography>}
          </Grid>
        </Grid>
      </>}
    </>
  );
};
