import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const wc = new WalletConnectConnector({
  infuraId: "0168c4f5d973491daae8d12b05e2f051",
  supportedChainIds: [1, 4, 100],
  qrcode: true,
  pollingInterval: 12000
});

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    wc.activate().then(acct => {
      console.log(acct);
    });


    // wc.isAuthorized().then((isAuthorized) => {
    //   if (isAuthorized) {
    //     activate(wc, undefined, true).catch(() => {
    //       setTried(true);
    //     })
    //   } else {
    //     setTried(true);
    //   }
    // })
  }, []);

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress) {
  suppress = suppress || false;
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(wc)
      }
      const handleChainChanged = (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(wc)
      }
      const handleAccountsChanged = (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(wc)
        }
      }
      const handleNetworkChanged = (networkId) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(wc)
      }

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      }
    }
  }, [active, error, suppress, activate]);
}
