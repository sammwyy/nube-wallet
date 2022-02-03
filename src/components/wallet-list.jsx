import { useContext } from "react";
import { WalletContext } from "../context/wallet-context";

export default function WalletList() {
  const context = useContext(WalletContext);

  return context.wallets.map((item, i) => (
    <div key={i}>
      {item.info.network} {item.getAddress()}
    </div>
  ));
}
