import { Avalanche, BinTools, Buffer, BN } from "avalanche";
import { ethers } from "ethers";
import config from "./config.js";
import RPC from "./utils/RPC.js";
const { host, port, protocol, networkID, cChainUrl, xChainUrl, xAddress, xPrivateKey, username, password } = config;

let avalanche = new Avalanche(host, port, protocol, networkID);
const xchain = avalanche.XChain();
const xrpc = new RPC(xChainUrl)

const importKey = async () => {
  let rsp = await xchain.importKey(username, password, xPrivateKey)
  console.log("xchain.importKey", rsp);
}

const exportXAssetToCAsset = async () => {
  const balances = await xchain.getAllBalances(xAddress);
  console.log(xAddress + " balances = ", JSON.stringify(balances));
};


{
  (async () => {
    await importKey();
    // await exportXAssetToCAsset();
  })();
}
