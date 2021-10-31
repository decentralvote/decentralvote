import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import Typography from "@material-ui/core/Typography";
import ProposalsList from "./ProposalsList";
import CreatePollEndDate from "./CreatePollEndDate";
import { ethers } from 'ethers';
import DecentralPollContract
  from '../artifacts/contracts/DecentralPoll.sol/DecentralPoll.json';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


interface createPollProps {
  w3r: any,
}

export default function CreatePoll(props: createPollProps) {

  const classes = useStyles();

  const [name, setName] = React.useState<string>("Poll Name");
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [proposals, setProposals] = React.useState(["name"]);
  const [deployedAddress, setDeployedAddress] = React.useState("");
  const web3React = props.w3r();


  const handleSubmit = () => {
    createPoll().then(r => {console.log(r)});
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
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
    // keep this fixed
    const voterBaseLogic = ethers.utils.formatBytes32String("Default Voting");

    // Poll Name
    const pollName = ethers.utils.formatBytes32String(name);

    // Poll Type
    // keep this fixed
    const pollType = ethers.utils.formatBytes32String("One Person One Vote");

    // Start Time
    // await ethers.provider.send("evm_mine", []);
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    const presentTime = (await provider.getBlock(1)).timestamp;
    const startTime = presentTime + 60;

    // Duration
    const duration = 60 * 60 * 24 * 5;
    // We get the contract to deploy
    // it will break if you are not connected
    const signer = web3React.library.getSigner(web3React.account);
    const pollContract = new ethers.ContractFactory(DecentralPollContract.abi, DecentralPollContract.bytecode, signer);

    const DecentralPoll = await pollContract.deploy(
      protocolAddresses,
      proposalNames,
      voterBaseLogic,
      pollName,
      pollType,
      startTime,
      duration
    );

    await DecentralPoll.deployed();

    setDeployedAddress(DecentralPoll.address);
    console.log("DecentralPoll deployed to:", DecentralPoll.address);
  }

  return (
    <div>
      <br />
      <Typography align={"center"} variant={"h4"}>Create Poll</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required id="standard-required" label="Required" defaultValue="Poll Name" value={name} onChange={e => setName(e.target.value)}/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <br />
          <Typography variant={"h6"}>End Time:</Typography>
          <CreatePollEndDate setDate={handleEndDateChange} date={endDate}/>
          <Typography align={"left"} variant={"h6"}>Add Proposals:</Typography>
          <ProposalsList proposals={proposals} setProposals={handleProposalChange} />
        </MuiPickersUtilsProvider>
      </form>
      <br />
      <Button variant={"contained"} color={"primary"} onClick={handleSubmit}>Submit Poll</Button>
      {deployedAddress && <Typography variant={"h6"}>Your poll address is: <span color={"green"}>{deployedAddress}</span></Typography>}
    </div>
  );
};
