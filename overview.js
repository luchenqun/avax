import AVAX from "./avax.js";
const { avalanche, cchain, pchain, xchain, xAddress, pAddress } = AVAX;

const testChainInfo = async () => {
  console.log("===========================chainInfo===========================");
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

  const address = xAddress;
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

  const address = pAddress;
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
