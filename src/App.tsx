import './App.css';
import Vote from './components/Vote';
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
import { injected } from './helpers/WalletHelper';

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
}));

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  const classes = useStyles();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <CssBaseline />
      <AppBar position="absolute" color="transparent" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
          ✓ decentralvote
          </Typography>
          <Wallet connector={injected} w3r={useWeb3React} />
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Vote />
        </Paper>
        <Copyright />
      </main>
    </Web3ReactProvider>
  );
}

export default App;
