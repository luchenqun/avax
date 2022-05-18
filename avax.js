import Avax, { BinTools, avm } from "avalanche";
import config from "./config.js";
import { ethers } from "ethers";
import RPC from "./utils/RPC.js";

const avalanche = new Avax.Avalanche(config.host, config.port, config.protocol, config.networkID);

// 需要用到的都从这里面导出去
export default {
  ...config,
  Avax,
  avalanche,
  pchain: avalanche.PChain(),
  xchain: avalanche.XChain(),
  cchain: avalanche.CChain(),
  cchainProvider: new ethers.providers.JsonRpcProvider(config.cChainRpcUrl),
  xrpc: new RPC(config.xChainUrl),
  crpc: new RPC(config.cChainUrl),
  prpc: new RPC(config.pChainUrl),
  keystore: avalanche.NodeKeys(),
  BinTools,
  avm,
  ethers,
  sleep: (time) => new Promise((resolve) => setTimeout(resolve, time)),
};
