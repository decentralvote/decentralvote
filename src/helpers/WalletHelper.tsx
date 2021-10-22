import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] });

export const wc = new WalletConnectConnector({
  infuraId: "0168c4f5d973491daae8d12b05e2f051",
  supportedChainIds: [1, 3, 4, 5, 42, 1337],
  qrcode: true,
  pollingInterval: 12000
});
