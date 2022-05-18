import AVAX from "./avax.js";
const { xchain, cchain, pchain, privateKey, keystore, username, password } = AVAX;
const receivePrivateKey = "PrivateKey-STjN5PYzi8UJyCfbkmdzRzhGmQSneo9BGHRFMjGeZjYH1djUM"; // 演示互相转移avax的私钥接收地址

{
  (async () => {
    const users = await keystore.listUsers();
    console.log("users", users);

    if (!users.includes(username)) {
      const successful = await keystore.createUser(username, password);
      console.log("create result", successful);
    }
    console.log(await xchain.importKey(username, password, privateKey));
    console.log(await cchain.importKey(username, password, privateKey));
    console.log(await cchain.importKey(username, password, receivePrivateKey));
    console.log(await pchain.importKey(username, password, privateKey));
  })();
}
