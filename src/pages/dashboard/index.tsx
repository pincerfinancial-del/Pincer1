import { useEffect, useState, type ReactNode } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import NoSSR from 'components/NoSSR';
import { ENVIRONMENT } from 'common/config';
import { selectedRpcAtom } from 'stores/settings';
import { useAtom } from 'jotai';
import MobileDashboard from 'components/Dashboard/MobileDashboard';
import Dashboard from 'components/Dashboard/Dashboard';
import WelcomePopup from 'components/WelcomePopup/WelcomePopup';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  CoinbaseWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

require('@solana/wallet-adapter-react-ui/styles.css');

function ClientOnly({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return <>{children}</>;
}

export default function Solend() {
  const [rpc] = useAtom(selectedRpcAtom);
  const network = ENVIRONMENT as WalletAdapterNetwork;
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const solflare = new SolflareWalletAdapter({ network });
  const coinbase = new CoinbaseWalletAdapter();

  return (
    <ConnectionProvider endpoint={rpc.endpoint}>
      <WalletProvider wallets={[solflare, coinbase]} autoConnect>
        <WalletModalProvider>
          <WelcomePopup />
          <ClientOnly>
            {isLargerThan800 ? <Dashboard /> : <MobileDashboard />}
          </ClientOnly>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}