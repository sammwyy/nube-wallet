import { createContext, useState } from "react";
import WalletManager from "../core/wallets/walletmanager";

export const WalletContext = createContext(new WalletManager());

export function WalletProvider({ children }) {
  const manager = new WalletManager();
  const [wallets, setWallets] = useState(manager.wallets);

  manager.wallets = wallets;
  manager.onUpdateWallets = function () {
    setWallets(this.wallets);
  };

  return (
    <WalletContext.Provider value={manager}>{children}</WalletContext.Provider>
  );
}
