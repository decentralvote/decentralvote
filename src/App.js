import './App.css';
import React, { useState } from 'react';
import Vote from './components/Vote';
import Wallet from './components/Wallet';
import Copyright from './components/Copyright';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from './hooks';

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

function App() {
  const classes = useStyles();

  const context = useWeb3React();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context;

  const [activatingConnector, setActivatingConnector] = useState();
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="transparent" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
          ✓ decentralvote
          </Typography>
          <Wallet />
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Vote />
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

export default App;
