import { Avalanche, BinTools, Buffer, BN } from "avalanche";
import { ethers } from "ethers";
import config from "./config.js";
import RPC from "./utils/RPC.js";
const { host, port, protocol, networkID, cChainUrl, cChainRpcUrl, xChainUrl, xAddress, xPrivateKey, username, password } = config;

const avalanche = new Avalanche(host, port, protocol, networkID);
const pchain = avalanche.PChain();
const xchain = avalanche.XChain();
const cchain = avalanche.CChain();
const cchainProvider = new ethers.providers.JsonRpcProvider(cChainRpcUrl);

const xrpc = new RPC(xChainUrl);
const crpc = new RPC(cChainUrl);

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// X 链资产往 C 链资产转移
const tranferAssetXChainToCChain = async () => {
  // 下面的地址是c链地址不同形式表示，对应私钥 39cfe0662cdede90094bf079b339e09e316b1cfe02e92d56a4d6d95586378e38
  const to = "0x666668F2a2E38e93089B6e6A2e37C854bb6dB7de";
  const cTo = "C-custom1j05zs52vvy0jpjg54lnlvvapuf6k0yd7mt8xq3";

  // 确保在转移资产之前，xAddress 的地址对应的私钥已经导入到了x链
  let balances = await xchain.getAllBalances(xAddress);
  console.log(xAddress + " before transfer balances = ", JSON.stringify(balances));

  balances = await cchainProvider.getBalance(to);
  console.log(to + " before transfer balances = ", balances.toString());

  const xParam = {
    assetID: "AVAX",
    from: [xAddress],
    to: cTo,
    changeAddr: xAddress,
    amount: 5000000,
    username,
    password,
  };
  console.log("avm.export", await xrpc.post("avm.export", xParam));

  const cParam = {
    to,
    sourceChain: "X",
    username,
    password,
  };
  console.log("avax.import", await crpc.post("avax.import", cParam));

  await sleep(1000); // 等一下上链

  balances = await xchain.getAllBalances(xAddress);
  console.log(xAddress + " after transfer balances = ", JSON.stringify(balances));

  balances = await cchainProvider.getBalance(to);
  console.log(to + " after transfer balances = ", balances.toString());
};

// C 链资产往 X 链资产转移
const tranferAssetCChainToXChain = async () => {
  // 下面的地址是c链地址不同形式表示，对应私钥 39cfe0662cdede90094bf079b339e09e316b1cfe02e92d56a4d6d95586378e38
  const from = "0x666668F2a2E38e93089B6e6A2e37C854bb6dB7de";

  // 确保在转移资产之前，xAddress 的地址对应的私钥已经导入到了x链
  let balances = await xchain.getAllBalances(xAddress);
  console.log(xAddress + " before transfer balances = ", JSON.stringify(balances));

  balances = await cchainProvider.getBalance(from);
  console.log(from + " before transfer balances = ", balances.toString());

  // 这里没有从那个账号转出的参数，所以不一定是从上面的from转出去的，有可能是你username下面的某个账号
  const cParam = {
    assetID: "AVAX",
    to: xAddress,
    amount: 5000000,
    username,
    password,
  };
  console.log("avax.export", await crpc.post("avax.export", cParam));

  const xParam = {
    to: xAddress,
    sourceChain: "C",
    username,
    password,
  };
  console.log("avm.import", await xrpc.post("avm.import", xParam));

  await sleep(1000);

  balances = await xchain.getAllBalances(xAddress);
  console.log(xAddress + " after transfer balances = ", JSON.stringify(balances));

  balances = await cchainProvider.getBalance(from);
  console.log(from + " after transfer balances = ", balances.toString());
};

{
  (async () => {
    try {
      console.log("tranferAssetXChainToCChain")
      await tranferAssetXChainToCChain();

      // console.log("tranferAssetCChainToXChain")
      // await tranferAssetCChainToXChain();
    } catch (error) {
      console.error("error:", error);
    }
  })();
}
