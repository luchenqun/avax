import { Avalanche, BinTools, Buffer, BN } from "avalanche";

let myNetworkID = 1337;
let avalanche = new Avalanche("avax-test.lucq.fun", 80, "http", myNetworkID);

const pchain = avalanche.PChain();
const xchain = avalanche.XChain();
const cchain = avalanche.CChain();

const testChainInfo = async () => {
  console.log("===========================chainInfo===========================");
  const keystore = avalanche.NodeKeys();
  const health = avalanche.Health();
  console.log("health", JSON.stringify(await health.health()));
};

// C-Chain-Test
const testCchain = async () => {
  console.log("============================cchain============================");
  console.log("getBaseFee = ", (await cchain.getBaseFee()).toString());
};

// X-Chain-Test
const testXchain = async () => {
  console.log("============================xchain============================");
  const blockchainID = xchain.getBlockchainID();
  const blockchainAlias = xchain.getBlockchainAlias();
  console.log("blockchainID = ", blockchainID);
  console.log("blockchainAlias = ", blockchainAlias);

  const address = "X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p";
  const balances = await xchain.getAllBalances(address);
  console.log(address + " balances = ", JSON.stringify(balances));
};

// P-Chain-Test
const testPchain = async () => {
  console.log("============================pchain============================");
  const blockchainID = pchain.getBlockchainID();
  const blockchainAlias = pchain.getBlockchainAlias();
  console.log("blockchainID = ", blockchainID);
  console.log("blockchainAlias = ", blockchainAlias);

  const address = "P-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p";
  const balances = await pchain.getBalance(address);
  console.log("balances = ", JSON.stringify(balances));
};

{
  (async () => {
    await testChainInfo();
    await testCchain();
    await testXchain();
    await testPchain();
  })();
}
