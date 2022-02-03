import { hasData, readData, writeData } from "../utils/system-utils";
import { decrypt, encrypt } from "../security/cipher";

import Ethereum from "../networks/ethereum";

export default class WalletManager {
  constructor() {
    this.file = "wallet";
    this.hasDB = hasData(this.file);
    this.networks = [Ethereum];
    this.wallets = [];

    this.close();
  }

  // Events to be fired.
  onUpdateWallets() {}

  // Functions.
  getNetwork(name) {
    for (const network of this.networks) {
      if (network.name?.toLowerCase() === name?.toLowerCase()) {
        return network;
      }
    }

    return null;
  }

  close() {
    this.database = null;
    this.opened = false;
    this.password = null;
  }

  addWallet(wallet) {
    this.wallets.push(wallet);
    this.database.wallets.push({
      network: wallet.info.network.toLowerCase(),
      key: wallet.getPrivateKey(),
    });
    this.onUpdateWallets();
    this.save();
  }

  createWallet(networkName) {
    const network = this.getNetwork(networkName);
    if (network == null) {
      throw new Error("Network " + networkName + " not found.");
    }
    const wallet = new network();
    wallet.createWallet();
    this.addWallet(wallet);
  }

  createDatabase(password) {
    this.hasDB = readData(this.file);

    if (this.hasDB) {
      throw new Error("Database file already exist.");
    } else {
      this.password = password;
      this.database = {
        wallets: [],
      };
      this.save();
    }
  }

  read() {
    const readedWallets = [];

    for (const wallet of this.database.wallets) {
      const network = this.getNetwork(wallet.network);
      readedWallets.push(new network(wallet.key));
    }

    this.wallets = readedWallets;
    this.onUpdateWallets();
  }

  open(password) {
    const buffer = readData(this.file);
    const asEncryptedStr = buffer.toString("utf-8");
    const asDecryptedStr = decrypt(password, asEncryptedStr);

    if (asDecryptedStr.startsWith("{")) {
      this.opened = true;
      this.database = JSON.parse(asDecryptedStr);
      this.password = password;
      this.read();
    } else {
      throw new Error("Invalid Password");
    }
  }

  save() {
    if (!this.opened) {
      throw new Error("Database isn't open");
    } else if (this.password == null) {
      throw new Error("Password is null");
    } else if (this.database == null) {
      throw new Error("Database is null");
    }

    const asJSONStr = JSON.stringify(this.database);
    const asEncryptedStr = encrypt(this.password, asJSONStr);
    writeData(this.file, asEncryptedStr);
  }
}
