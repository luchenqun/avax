import { BinTools, avm } from "avalanche";
import { ethers } from "ethers";

const privateKey = (hrp = "custom", chainPrefix = "X", _privateKey) => {
  let wallet = null;
  if (_privateKey) {
    wallet = _privateKey.length >= 64 ? new ethers.Wallet(_privateKey) : new ethers.Wallet(new BinTools().cb58Decode(_privateKey).toString("hex"));
  } else {
    wallet = ethers.Wallet.createRandom();
  }
  const privateKey = wallet.privateKey.replace("0x", "");
  const address = wallet.address;

  const cb58PrivateKey = new BinTools().cb58Encode(Buffer.from(privateKey, "hex"));
  let cKeyChain = new avm.KeyChain(hrp, chainPrefix);
  let cKeypair = cKeyChain.importKey(Buffer.from(privateKey, "hex"));
  console.log("===========================hex===========================");
  console.log("hex privateKey = " + privateKey);
  console.log("hex address = " + address);
  console.log("==========================cb58===========================");
  console.log("cb58 privateKey = " + cb58PrivateKey);
  console.log("cb58 publicKey = " + cKeypair.getPublicKeyString());
  console.log("cb58 address = " + cKeypair.getAddressString());
  console.log("decode to hex privateKey = " + new BinTools().cb58Decode(cb58PrivateKey).toString("hex"));
  console.log();
};

privateKey(); // 随机一个私钥
privateKey("custom", "X", "ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"); // cb58 格式私钥
privateKey("custom", "X", "39cfe0662cdede90094bf079b339e09e316b1cfe02e92d56a4d6d95586378e38"); // 16 进制格式私钥
