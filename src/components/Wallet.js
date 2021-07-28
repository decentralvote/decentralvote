import {Button} from "@material-ui/core";
import { useWeb3React } from '@web3-react/core';

function Wallet(props) {

  //onClick={this.walletConnectInit} fetching={fetching}

  return (
    <>
      {!props.address ? (
      <Button variant="contained" color="primary">
        Connect Wallet
      </Button>
      ) : (
        <Button variant="contained" color="primary">
          {props.address}
        </Button>
      )}
    </>
  )
}

export default Wallet;
