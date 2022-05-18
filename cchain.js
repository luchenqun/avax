import AVAX from "./avax.js";
const { cchainProvider, cPrivateKey: privateKey, cchain, ethers } = AVAX;

const baseFee = async () => {
  console.log("============================cchain============================");
  console.log("getBaseFee = ", (await cchain.getBaseFee()).toString());
};

const sendTx = async () => {
  const wallet = new ethers.Wallet(privateKey, cchainProvider);
  const to = "0x00000be6819f41400225702d32d3dd23663dd690";
  const tx = {
    to,
    value: ethers.utils.parseEther("1.0"),
  };

  await wallet.signTransaction(tx);
  console.log(wallet.address + " have balance ", (await wallet.getBalance()).toString());
  console.log(wallet.address + " nonce ", await wallet.getTransactionCount());
  const txReply = await wallet.sendTransaction(tx);
  await txReply.wait();
  console.log(to + " have balance ", (await cchainProvider.getBalance(to)).toString());
};

{
  (async () => {
    await baseFee();
    await sendTx();
  })();
}
