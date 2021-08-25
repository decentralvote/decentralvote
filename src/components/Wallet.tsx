import {Button} from "@material-ui/core";
import { UserRejectedRequestError  } from '@web3-react/walletconnect-connector';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {walletProps} from "./pollTypes";

const useStyles = makeStyles((theme) => ({
  address: {
    marginRight: theme.spacing(1)
  }
}));

function Wallet(props: walletProps) {

  if (!props.connector || !props.w3r) {
    throw new Error('Bad Wallet Config');
  }

  const web3React = props.w3r();

  const classes = useStyles();

  function handleError(error: any) {
    if (error instanceof UserRejectedRequestError) {
      props.connector.handleDisconnect();
    }
  }

  function initConnection() {
    web3React.activate(props.connector, handleError);
  }

  function closeConnection() {
    props.connector.close();
  }

  function handleConnect() {
    if (web3React.active) {
      closeConnection();
    } else {
      initConnection();
    }
  }

  function getFormattedWalletAddress() {
    let output = web3React.account.substring(0,4);
    output += '...';
    output += web3React.account.substring(web3React.account.length - 4);
    return output;
  }

  return (
    <>
      <Typography component="p" className={classes.address}>
        {web3React.active && getFormattedWalletAddress()}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleConnect}>
        {!web3React.active ? 'Connect Wallet' : 'Disconnect'}
      </Button>
    </>
  )
}

export default Wallet;
