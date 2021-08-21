import './App.css';
import Vote from './components/Vote';
import CreatePoll from './components/CreatePoll';
import Wallet from './components/Wallet';
import Copyright from './components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { ethers } from "ethers";
import { wc } from './helpers/WalletHelper';
import {Badge, IconButton} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    flexGrow: 1,
    fontWeight: 900
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    }
  },
  createButton: {
    color: '#3b6eba',
  },
  voteButton: {
    color: '#dc1010',
  }
}));

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  const classes = useStyles();

  const [onVote, setOnVote] = useState(true);
  const [onCreatePoll, setOnCreatePoll] = useState(false);

  const handleCreateClick = () => {
    setOnVote(false);
    setOnCreatePoll(true);
  }

  const handleVoteClick = () => {
    setOnVote(true);
    setOnCreatePoll(false);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <CssBaseline />
      <AppBar position="absolute" color="transparent" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
          ✓ decentralvote
          </Typography>
          <IconButton className={classes.createButton} aria-label="create poll" color="inherit" onClick={handleCreateClick}>
            <Badge color="secondary">
              <CreateIcon />
            </Badge>
          </IconButton>
            <IconButton className={classes.voteButton} aria-label="create poll" color="inherit" onClick={handleVoteClick}>
              <Badge color="secondary">
                <HowToVoteIcon />
              </Badge>
            </IconButton>
          <Wallet connector={wc} w3r={useWeb3React} />
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {onVote && <Vote/>}
          {onCreatePoll && <CreatePoll/>}
        </Paper>
        <Copyright />
      </main>
    </Web3ReactProvider>
  );
}

export default App;
