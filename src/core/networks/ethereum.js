import { Wallet } from "ethers";

const networkInfo = {
  name: "Ethereum",
  code: "eth",
  decimals: 1,
};

class Ethereum {
  constructor(privateKey) {
    this.info = networkInfo;

    if (privateKey) {
      this.wallet = new Wallet(privateKey);
    }
  }

  getAddress() {
    return this.wallet?.address;
  }

  async getBalance() {
    const req = await fetch(
      "https://api.ethplorer.io/getAddressInfo/" +
        this.getAddress() +
        "?apiKey=freekey"
    );

    const data = await req.json();
    const result = {
      _: data.ETH?.balance ?? 0,
      tokens: data.tokens || [],
    };

    return result;
  }

  getSeed() {
    return this.wallet?.mnemonic.phrase;
  }

  getPrivateKey() {
    return this.wallet?.privateKey;
  }

  importWalletFromKey(key) {
    this.wallet = new Wallet(key);
  }

  createWallet() {
    this.wallet = Wallet.createRandom();
  }
}

// Network props.
Ethereum.info = networkInfo;

export default Ethereum;
